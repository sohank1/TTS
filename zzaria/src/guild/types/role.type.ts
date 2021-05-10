export interface Role {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: string;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
}
