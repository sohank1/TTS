import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, ClickAwayListener, Drawer } from "@material-ui/core";
import { navLinks } from "./NavLinks";
import { DashboardIcon } from "../../icons/DashboardIcon";
import { BugsIcon } from "../../icons/BugsIcon";
import { NewsIcon } from "../../icons/NewsIcon";
import { PatchNotesIcon } from "../../icons/PatchNotesIcon";
import { LoginButton } from "../LoginButton";
import { useConn } from "../../shared-hooks/useConn";
import { DashboardUser } from "../DashboardNavBar";


interface NavBarProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NavBar: React.FC<NavBarProps> = ({ isOpen, setIsOpen }) => {
    const { user } = useConn();
    const { route } = useRouter();

    return (
        <Drawer className="nav-bar-ui-component" open={isOpen} anchor="right">
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <div>
                    <section>
                        <Button onClick={() => setIsOpen(false)} id="close">
                            <img src="assets/close.svg" />
                        </Button>
                    </section>

                    <ul>
                        {navLinks.map(l => (
                            <div className="links" key={l.name}>
                                <section className="link">
                                    <Link href={l.path}>
                                        <Button className={route === l.path ? "active" : null}>
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

                                </section>
                            </div>
                        ))}
                        <div className="login-button">
                            {user ? <DashboardUser /> : <LoginButton />}
                        </div>
                    </ul>
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}