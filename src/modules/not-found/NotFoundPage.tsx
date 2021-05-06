import { useState } from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { NavBar } from "../../ui/NavBar";
import { navLinks } from "../../ui/NavBar/NavLinks";
import { Footer } from "../../ui/Footer";

export const NotFoundPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="not-found-page">
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />

            <nav>
                <Link href="/">
                    <Button className="tts-button">TTS</Button>
                </Link>

                <div className="links">
                    {navLinks.map(link => (
                        <Link key={link.path} href={link.path}>
                            <Button className="a">{link.name}</Button>
                        </Link>
                    ))}
                </div>

                <Button onClick={() => setIsOpen(true)} className="hamburger">
                    <img src="/assets/hamburger.svg" />
                </Button>
            </nav>

            <div className="main">
                <img src="/assets/lost.svg" className="lost desktop" alt="A picture of a lost man." />
                <h2>Oh No!</h2>
                <p>It seems you’re lost! Here are some suggestions.</p>
                <section className="content">
                    <Button className="issue" href="https://github.com/CreeperPlanet26/TTS-Client/issues" target="_blank">Open a Issue</Button>
                    <Link href="/bugs">
                        <Button className="bugs">Report a Bug</Button>
                    </Link>
                </section>
                <img src="/assets/lost.svg" className="lost" alt="A picture of a lost man." />
                
                <div className="footer"><Footer /></div>
            </div>
        </div>
    )
}
