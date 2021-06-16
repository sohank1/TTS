import Link from "next/link";
import { Button } from "@material-ui/core";
import { DashboardNavBar } from "../../ui/DashboardNavBar";

const data = [
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
        dislikes: 2,
        comments: 1,
    },
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
        dislikes: 2,
        comments: 1,
    },
];

export const PatchNotesPage = () => {
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
                    <table>
                        <div className="search">
                            <div className="container">
                                <input type="text" placeholder="Search" />
                                <button>
                                    <img src="assets/icons/search.svg" />
                                </button>
                            </div>
                        </div>
                        <tr className="top-row">
                            <th>Image</th>
                            <th>Details</th>
                            <th>Date</th>
                            {/* <th>Opinion</th> */}
                        </tr>

                        {data.map((p, i) => (
                            <>
                                <hr />
                                <Link href="/">
                                    <a>
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
                                    </a>
                                </Link>

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

                                {data.length - 1 === i ? <hr /> : null}
                            </>
                        ))}
                    </table>
                </section>
            </div>
        </DashboardNavBar>
    );
};
