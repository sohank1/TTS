/**
 * Get the icon url for a specific guild by their id and avatar.
 * @param id - The id of the guild.
 * @param icon - The icon hash of the guild.
 */
export const getIconUrl = (id: string, icon: string): string =>
    `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=2048`;
