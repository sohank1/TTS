import { inviteLink } from "../buttons/join/invite-link";

/**
 * Icon links that are displayed on the footer.
 */
interface FooterLinks {
    /**
     * The path to the svg icon.
     */
    svgPath: string;

    /**
     * The url of the svg.
     * When the icon is clicked on the user will redirected to this url.
     */
    url: string;
}

/**
 * The order the elements are in is the order they will be displayed.
 * Simply add a new element to the array to add a new link.
 */
export const footerLinks: FooterLinks[] = [
    {
        svgPath: "assets/icons/discord.svg",
        url: inviteLink,
    },
    {
        svgPath: "assets/icons/twitter.svg",
        url: "https://twitter.com/TheTomatoHeads",
    },
    {
        svgPath: "assets/icons/github.svg",
        url: "https://github.com/CreeperPlanet26/TTS-Server",
    },
];
