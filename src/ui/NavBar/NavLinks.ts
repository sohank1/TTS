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
}

export const navLinks: NavLink[] = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Bugs', path: '/bugs' },
    { name: 'News', path: '/news' },
    { name: 'Patch Notes', path: '/patch-notes' },
];