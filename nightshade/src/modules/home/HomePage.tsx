import { useState } from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { LoginButton } from "../../ui/LoginButton";
import { JoinButton } from "../../ui/JoinButton";
import { Footer } from "../../ui/Footer";
import { JourneyButton } from "../../ui/JourneyButton";
import { NavBar } from "../../ui/NavBar";
import { navLinks } from "../../ui/NavBar/NavLinks";
import { useConn } from "../../shared-hooks/useConn";
import { MetaController } from "../display/MetaController";

export const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useConn();

    return (
        <>
            <MetaController />

            <div className="home-page">
                <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
                <nav>
                    <Link href="/">
                        <Button className="tts-button">TTS</Button>
                    </Link>

                    <div className="links">
                        {navLinks.map((link) => (
                            <Link key={link.path} href={link.path}>
                                <Button className="a">{link.name}</Button>
                            </Link>
                        ))}
                    </div>

                    <Button onClick={() => setIsOpen(true)} className="hamburger">
                        <img src="/assets/hamburger.svg" />
                    </Button>
                </nav>

                <div className="grid">
                    <div className="text">
                        <h1>The Tomatohead Society</h1>
                        <p>
                            The Tomatohead Society (TTS) is a Fortnite clan that strongly supports Team Pizza and is
                            always looking for new members like you!
                        </p>
                        <section>
                            <div className="login-button">
                                {user ? (
                                    <Link href="/logout">
                                        <Button variant="contained" className="logout-button">
                                            <div className="content">
                                                <h3>Logout</h3>
                                                <img src="assets/icons/logout.svg" />
                                            </div>
                                        </Button>
                                    </Link>
                                ) : (
                                    <LoginButton />
                                )}
                            </div>
                            <div className="join-button">
                                <JoinButton />
                            </div>
                        </section>
                    </div>
                    <img className="tomatohead" src="/assets/tomatohead.png" alt="A picture of tomatohead." />
                </div>

                <article className="team-pizza">
                    <img src="assets/pizza.svg" alt="A picture of a pizza." />
                    <div className="text">
                        <h1>Team Pizza</h1>
                        <p>
                            Team Pizza is the team for Tomatohead in the Food war and was the biggest motivator for
                            creating TTS. We heavily support Team Pizza, so If you’d like to join, we recommend you
                            support them too.
                        </p>
                    </div>
                </article>

                <article className="discord">
                    <img src="assets/chat.svg" alt="A picture of a pizza." />
                    <div className="text">
                        <h1>Discord</h1>
                        <p>
                            We have a Discord server! our server, is where you can talk to the mods, do tryouts, attend
                            giveaways, share your opinion on polls, and so much more! We do most of our stuff on
                            Discord, so you should join if you want to see what’s happening!
                        </p>
                    </div>
                </article>

                <article className="something">
                    <img src="assets/together.svg" alt="A picture of a pizza." />
                    <div className="text">
                        <h1>Something</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum magna morbi facilisis
                            tellus diam amet. Enim magna. changed
                        </p>
                        <div className="journey-button">
                            <JourneyButton />
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        </>
    );
};
