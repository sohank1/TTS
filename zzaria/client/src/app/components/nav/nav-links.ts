/**
 * Represents a link that's displayed on the nav bar.
 */
export interface NavLink {
    /**
     * The nav of the link that's displayed.
     */
    name: string;

    /**
     * The path to the link.
     */
    path: string;

    /**
     * The svg selector.
     */
    svg: string;
}

export const navLinks: NavLink[] = [
    { name: "Dashboard", svg: "app-dashboard", path: "/dashboard" },
    { name: "Bugs", svg: "app-bugs", path: "/bugs" },
    { name: "News", svg: "app-news", path: "/news" },
    { name: "Patch Notes", svg: "app-patch-notes", path: "/patch-notes" },
];
