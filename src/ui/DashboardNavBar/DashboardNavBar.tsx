import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { NavBar } from "../NavBar";
import { navLinks } from "../NavBar/NavLinks";
import { useRouter } from "next/router";
import { DashboardIcon } from "../../icons/DashboardIcon";
import { BugsIcon } from "../../icons/BugsIcon";
import { NewsIcon } from "../../icons/NewsIcon";
import { PatchNotesIcon } from "../../icons/PatchNotesIcon";
import { LoginButton } from "../LoginButton";
import { DashboardUser } from "../DashboardUser";
import { useConn } from "../../shared-hooks/useConn";
import { Footer } from "../Footer";

export const DashboardNavBar: React.FC = ({ children }) => {
    const { user } = useConn();
    const [isOpen, setIsOpen] = useState(false);
    const { route } = useRouter();

    return (
        <div className="dashboard-nav-bar-ui-component">
            <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <nav>
                <Link href="/">
                    <Button className="tts-button">TTS</Button>
                </Link>

                <Button onClick={() => setIsOpen(true)} className="hamburger">
                    <img src="assets/hamburger.svg" />
                </Button>
            </nav>

            <section>
                <div className="side-nav">

                    <header>
                        <img src="assets/tts-logo.png" alt="The TTS logo" />
                        <Link href="/"><Button className="tts-button on-card">TTS</Button></Link>
                    </header>

                    <section className="links">
                        {navLinks.map(l => (
                            <div className="link" key={l.name}>
                                <Link href={l.path}>
                                    <Button className={`${route === l.path ? "active" : null} on-card`}>
                                        {(() => {
                                            switch (l.name) {
                                                case "Dashboard":
                                                    return <DashboardIcon />
                                                case "Bugs":
                                                    return <BugsIcon />
                                                case "News":
                                                    return <NewsIcon />
                                                case "Patch Notes":
                                                    return <PatchNotesIcon />
                                            }
                                        })()}
                                        {l.name}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </section>


                    {user ?
                        <div className="dashboard-user">
                            <DashboardUser />
                        </div> :
                        <div className="login-button">
                            <LoginButton />
                        </div>}

                </div>

                <div className="children">
                    {<>{children}</>}
                </div>

                <div className="footer">
                    <Footer />
                </div>

            </section>
        </div>
    )
}
