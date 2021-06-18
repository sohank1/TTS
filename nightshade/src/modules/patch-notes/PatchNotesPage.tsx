import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Button } from "@material-ui/core";
import { DashboardNavBar } from "../../ui/DashboardNavBar";

const defaultPatchNotes = [
    {
        name: "Penguin's Zone/Scrim Wars V2.1",
        image: "https://i.imgur.com/OKIwF04.png",
        author: {
            name: "Mysterious_Penguin",
            avatarUrl:
                "https://cdn.discordapp.com/avatars/539928835953524757/fa626df27e371d63c56ee3f4ad809e4c.png?size=2048",
        },
        date: "1/20/19",
        likes: 1,
        dislikes: 4,
        comments: 1,
    },
    {
        name: "Creeper's Turtle Zone Wars (v0.1 Beta) Release Notes",
        image: "https://i.imgur.com/TkFC4XF.png",
        author: {
            name: "Creeper",
            avatarUrl:
                "https://cdn.discordapp.com/avatars/481158632008974337/d9712404dc60ea0f39712a91f7b914d4.png?size=2048",
        },
        date: "10/20/20",
        likes: 50,
        dislikes: 0,
        comments: 4,
    },
    {
        name: "TTS (v1.4) Patch Notes",
        image: "https://i.imgur.com/7yKQiTQ.png",
        author: {
            name: "TTS",
            avatarUrl:
                "https://cdn.discordapp.com/icons/570349873337991203/7f945e4de66e287e33e029043c99dd76.png?size=2048",
        },
        date: "6/12/20",
        likes: 270,
        dislikes: 380,
        comments: 100,
    },
];

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
    );
};
