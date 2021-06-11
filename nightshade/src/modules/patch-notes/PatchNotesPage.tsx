import Link from "next/link";
import { Button } from "@material-ui/core";
import { DashboardNavBar } from "../../ui/DashboardNavBar";

export const PatchNotesPage = () => {
    return (
        <DashboardNavBar>
            <div className="patch-notes-page">
                <section className="creations">
                    <img src="assets/tomato.png" />
                    <h1>See Creations from Creators</h1>
                    <p>See the newest patch notes from creators</p>
                    <Link href="/patch-notes">
                        <Button>View</Button>
                    </Link>
                </section>
            </div>
        </DashboardNavBar>
    );
};