import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Button } from "@material-ui/core";
import { DashboardNavBar } from "../../ui/DashboardNavBar";
import { PatchNotesMetaController } from "./PatchNotesMetaController";
import { defaultPatchNotes } from "./defaultPatchNotes";

export const PatchNotesPage = () => {
    const [patchNotes, setPatchNotes] = useState(defaultPatchNotes);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value
            ? setPatchNotes([
                  defaultPatchNotes.find((p) => p.name.toLowerCase().includes(e.target.value.toLowerCase())),
              ])
            : setPatchNotes(defaultPatchNotes);
    };

    return (
        <>
            <PatchNotesMetaController />
            <DashboardNavBar>
                <div className="patch-notes-page">
                    <section className="creations">
                        <img src="assets/tomato.png" />
                        <div className="text">
                            <h1>See Creations from Creators</h1>
                            <p>See the newest patch notes from creators</p>
                            <Link href="/">
                                <Button>View</Button>
                            </Link>
                        </div>
                        <img src="assets/tomato.png" className="laptop" />
                    </section>

                    <section className="panel">
                        <div className="search">
                            <div className="container">
                                <input onChange={onChange} type="text" placeholder="Search" />
                                <button>
                                    <img src="assets/icons/search.svg" />
                                </button>
                            </div>
                        </div>
                        <table>
                            <tr className="top-row">
                                <th>Image</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Opinion</th>
                            </tr>

                            {patchNotes.map((p, i) => {
                                if (p)
                                    return (
                                        <>
                                            <hr />
                                            {/* <Link href="/"> */}
                                            {/* <a> */}
                                            <tr>
                                                <th className="thumbnail">
                                                    <img src={p.image} />
                                                </th>

                                                <th className="info">
                                                    <div className="details">
                                                        <h1>{p.name}</h1>
                                                        <div className="user">
                                                            <img className="avatar" src={p.author.avatarUrl} />
                                                            <h2>{p.author.name}</h2>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <h4 className="date">{p.date}</h4>
                                                </th>
                                                <th>
                                                    <div className="interactions">
                                                        <div className="likes">
                                                            <Button>
                                                                <img src="assets/icons/like.svg" />
                                                            </Button>
                                                            <h5>{p.likes}</h5>
                                                        </div>
                                                        <div className="dislikes">
                                                            <Button>
                                                                <img src="assets/icons/dislike.svg" />
                                                            </Button>
                                                            <h5>{p.dislikes}</h5>
                                                        </div>
                                                        <div className="comments">
                                                            <Button>
                                                                <img src="assets/icons/comment.svg" />
                                                            </Button>
                                                            <h5>{p.comments}</h5>
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            {/* </a> */}
                                            {/* </Link> */}

                                            <div className="body">
                                                <h4 className="date">{p.date}</h4>
                                                <div className="interactions">
                                                    <div className="likes">
                                                        <Button>
                                                            <img src="assets/icons/like.svg" />
                                                        </Button>
                                                        <h5>{p.likes}</h5>
                                                    </div>
                                                    <div className="dislikes">
                                                        <Button>
                                                            <img src="assets/icons/dislike.svg" />
                                                        </Button>
                                                        <h5>{p.dislikes}</h5>
                                                    </div>
                                                    <div className="comments">
                                                        <Button>
                                                            <img src="assets/icons/comment.svg" />
                                                        </Button>
                                                        <h5>{p.comments}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            {patchNotes.length - 1 === i ? <hr /> : null}
                                        </>
                                    );

                                return <p>Not found</p>;
                            })}
                        </table>
                    </section>
                </div>
            </DashboardNavBar>
        </>
    );
};
