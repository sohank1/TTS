import { Button } from "@material-ui/core";
import React from "react";
import { footerLinks } from "./FooterLinks";

interface FooterProps {
    color?: "bg" | "bg-alt";
}

export const Footer: React.FC<FooterProps> = ({ color }) => (
    <div className="footer-ui-component">
        <footer className={color}>
            <h4>© 2020 TTS. All rights reserved.</h4>

            <section className="icons">
                {footerLinks.map((l) => (
                    <Button href={l.url} key={l.url} target="_blank">
                        <img src={l.svgPath} />
                    </Button>
                ))}
            </section>

            <h4>Made with 💖 by TTS Mods.</h4>
        </footer>
    </div>
);
