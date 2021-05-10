import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UserAnimation } from "src/app/components/user/user.animation";
import { HttpService } from "src/app/http/http.service";
import { socket } from "src/app/http/socket";
import { User } from "src/app/http/user/user.type";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    animations: UserAnimation,
})
export class DashboardComponent implements OnInit {
    public user: User;
    public files: { url: string; path: string }[] = [];
    public progress = 0;
    public showText = false;
    public showUpload = false;
    public ready = true;

    public get state(): string {
        return this.showUpload ? "show" : "remove";
    }

    constructor(private _http: HttpService, private _httpClient: HttpClient) {
        // setTimeout(() => this.ready = true, 60)
        // this._http.user.getMe().then(u => this.user = u);
        socket.emit("auth", {
            accessToken: localStorage.getItem("@tts/token"),
        });
        socket.on("auth-success", ({ user }: { user: User }) => {
            this.user = user;
        });
        this.fetchData().then(() => console.log(this.files));

        // setInterval(() => { this.progress++; console.log(this.progress) }, 100)
    }

    public ngOnInit(): void {
        const uploadContainer = <HTMLDivElement>(
            document.querySelector(".upload-container")
        );
        document.onclick = (e) => {
            if (e.target === uploadContainer) {
                console.log(e.target);
                uploadContainer.style.display = "none";
            }
        };
    }

    public async submitData() {
        const form = <HTMLFormElement>document.querySelector("form");

        this._httpClient
            .post(environment.httpEndpoints.CDN, new FormData(form), {
                reportProgress: true,
                observe: "events",
            })
            .subscribe((r) => {
                if (r.type === HttpEventType.Response) {
                    console.log("Upload complete");
                    this.fetchData();
                    console.log(r);
                }

                if (r.type === HttpEventType.UploadProgress) {
                    const percentDone = Math.round((100 * r.loaded) / r.total);
                    this.progress = percentDone;
                    console.log("Progress " + percentDone + "%");
                }
            });
    }

    public async deleteFile(url: string): Promise<void> {
        await this._httpClient.delete(url).toPromise();
        this.fetchData();
    }

    public handleFileChange(): void {
        this.showUpload = true;

        // Wait till Angular change detection adds the upload container to the DOM.

        setTimeout(() => {
            const uploadContainer = document.querySelector(".upload-container");

            for (const file of <File[]>(
                Array.from(document.querySelector("input").files)
            )) {
                console.log(document.querySelector("input").files);
                const imgContainer = document.createElement("div");
                const img = document.createElement("img");
                const h3 = document.createElement("h3");

                imgContainer.classList.add("img-container");
                img.src = URL.createObjectURL(file);
                h3.innerText = file.name;
                h3.classList.add("test-h3");

                imgContainer.append(img, h3);
                uploadContainer.appendChild(imgContainer);
                console.log("bruh", this.showUpload);
            }
        }, 10);
    }

    public addFile(e: HTMLElementEventMap["click"]): void {
        document.querySelector("input").click();
    }

    public handleClick(e: HTMLElementEventMap["click"]): void {
        e.preventDefault();
        this.submitData();
        this.showUpload = false;
    }

    public dragOver(e: HTMLElementEventMap["dragover"]): void {
        e.preventDefault();
        console.log(e.dataTransfer.items);
        // If one of the dragged items is not a file then return.
        for (const item of Array.from(e.dataTransfer.items))
            if (item.kind !== "file") return;

        this.showText = true;
    }

    public dragLeave(): void {
        this.showText = false;
    }

    public drop(e: HTMLElementEventMap["drop"]): void {
        e.preventDefault();
        this.showText = false;

        // https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
        for (const item of Array.from(e.dataTransfer.items))
            if (item.kind !== "file") return;

        document.querySelector("input").files = e.dataTransfer.files;
        this.handleFileChange();
    }

    public preventDefault(e: HTMLElementEventMap["submit"]): void {
        e.preventDefault();
    }

    public async fetchData(): Promise<void> {
        const r = await fetch(environment.httpEndpoints.CDN);
        const d = await r.json();

        this.files = [];

        for (const i of d) {
            i.url = environment.httpEndpoints.CDN + i.path;
            this.files.push(i);
        }

        this.files = this.files.reverse();
    }

    public getFileType(url: string): string {
        const imgExtensions = ["png", "jpg", "jpeg"];
        const vidExtensions = ["mp4", "avi", "mov"];
        const audioExtensions = ["mp3", "wav"];

        if (imgExtensions.some((e) => url.endsWith(e))) return "img";
        if (vidExtensions.some((e) => url.endsWith(e))) return "vid";
        if (audioExtensions.some((e) => url.endsWith(e))) return "audio";
    }
}
