import { HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { resolve } from "path";
import { File as FileDoc } from "./file/file.schema";

// const client = new Client();
//  client.login(process.env.BOT_TOKEN);

@Injectable()
export class CdnService {
    constructor(
        @InjectModel(FileDoc.name)
        private FileModel: Model<FileDoc>,
        private _http: HttpService
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async createFiles(filesSent: any, res: Response): Promise<void> {
        // console.log("filesSent", filesSent);
        // let files = [];
        // for (const name in filesSent) {
        //     for (const file in filesSent[name]) files.push(filesSent[name][file]);
        // }
        // console.log(files, "F");
        // files = files.map((n) => {
        //     console.log(".map()", n);
        //     n = this.genFileName(n);
        //     return n;
        // });
        // console.log(files, "F");
        // // const channel = <TextChannel>client.channels.cache.get("795712339785154582");
        // console.log("sending");
        // for (const f of files) {
        //     // If the file already exists throw an error.
        //     if (await this.FileModel.findOne({ path: `/${f.name}` }))
        //         throw new HttpException("File already exists", HttpStatus.BAD_REQUEST);
        //     // const a = new MessageAttachment(f.data, f.name);
        //     // const { attachments } = await channel.send(a);
        //     await this.FileModel.create({
        //         path: `/${f.name}`,
        //         // url: attachments.first().url,
        //     });
        //     res.send({ message: "Created file." });
        // }
    }

    public async getFile(req: Request, res: Response): Promise<void> {
        const path = req.url.split("/cdn")[1];

        const file = await this.FileModel.findOne({ path });
        if (!file) return res.sendFile(resolve("./client/dist/TTS-Client/index.html"));

        const r = await this._http.axiosRef({
            method: "get",
            responseType: "stream",
            url: file.url,
        });
        r.data.pipe(res);
    }

    public async getAll(): Promise<FileDoc[]> {
        return this.FileModel.find();
    }

    public async deleteFile(req: Request): Promise<{ message: string; status: number }> {
        console.log(req.url);
        // const path = req.url.split('/cdn')[1];

        // const file = await this.FileModel.findOne({ path });
        // if (!file) throw new HttpException('File not found', HttpStatus.NOT_FOUND);

        // try {
        //     await file.delete();
        // }

        // catch (err) {
        //     throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        // }

        return { message: "Deleted file.", status: 200 };
    }

    /**
     * Takes a file name like "Penguin's-Advanced-ZoneScrim-Wars-V4.1.png" and changes it to "Penguin's-Advanced-ZoneScrim-Wars-V4.1-aybfj2clkl.png" and returns it.
     * Changes any spaces to dashes.
     * @param name - The old name of the file
     */
    private genFileName(name: string): string {
        // Replace each space with a dash.
        name = name.replace(/s+/g, "-");

        // Generate random 10 char string.
        const randomStr = `-${Math.random().toString(36).substr(2, 10)}`;

        // Replace each "." with ",." and split it by "," to get "." in the split arr. "Penguin's-Advanced-ZoneScrim-Wars-V4.1.png" => ["Penguin's-Advanced-ZoneScrim-Wars-V4", ".1", "-aybfj2clkl", ".png"]
        // The Ëß are 2 special chars. A file name should never include Ëß or the random string will be inserted somewhere else.
        // It is "Ëß." because we want the element to start with "." instead of ending with it. "v1Ëß.4Ëß.jpg" => ["v1", ".4", "-a72qtaus68", ".jpg"] => "v1.4-a72qtaus68.jpg"
        // If it was ".Ëß" then it would be v1.,4.,jpg => ["v1.", "4.", "-ypzgia4rrl", "jpg"] => "v1.4.-ypzgia4rrljpg"
        const arr = name.replace(/\./gi, "Ëß.").split("Ëß");

        // Insert the random string in the second to last element ["Penguin's-Advanced-ZoneScrim-Wars-V4", ".1", ".png"] => ["Penguin's-Advanced-ZoneScrim-Wars-V4", ".1", "-i318oex8xz", ".png"]
        arr.splice(arr.length - 1, 0, randomStr);
        name = arr.join("");

        return name;
    }
}
