export interface Content {
    id: string;
    name: string;
    iconUrl: string;
    roles: Role[];
    members: Member[];
}

export interface Role {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
}

export interface Member {
    id: string;
    username: string;
    discriminator: string;
    bot: boolean;

    roles: Role[];
    joinedAt: Date;
}
