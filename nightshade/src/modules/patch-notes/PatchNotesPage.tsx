import Link from "next/link";
import { Button } from "@material-ui/core";
import { DashboardNavBar } from "../../ui/DashboardNavBar";

export const PatchNotesPage = () => {
    return (
        <DashboardNavBar>
            <div className="patch-notes-page">
                <section className="creations">
                    <img src="assets/tomato.png" />
                    <div className="text">
                        <h1>See Creations from Creators</h1>
                        <p>See the newest patch notes from creators</p>
                        <Link href="/patch-notes">
                            <Button>View</Button>
                        </Link>
                    </div>
                    <img src="assets/tomato.png" className="laptop" />
                </section>

                <section className="panel">
                    <table>
                        <tr className="top-row">
                            <th>Image</th>
                            <th>Details</th>
                            <th>Date</th>
                            {/* <th>Opinion</th> */}
                        </tr>
                        <tr>
                            <th className="thumbnail">
                                <img src="https://i.imgur.com/OKIwF04.png" />
                            </th>
                            <th>
                                <div className="details">
                                    <h1>Penguin's Zone/Scrim Wars V2.1</h1>
                                    <div className="user">
                                        <img
                                            className="avatar"
                                            src="https://cdn.discordapp.com/avatars/539928835953524757/fa626df27e371d63c56ee3f4ad809e4c.png?size=2048"
                                        />
                                        <h2>Mysterious_Penguin</h2>
                                    </div>
                                </div>
                            </th>

                            <th>1/20/19</th>
                        </tr>
                    </table>
                </section>
            </div>
        </DashboardNavBar>
    );
};
