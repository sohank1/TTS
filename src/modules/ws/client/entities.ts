export interface User {
    _id: string;
    id: string;
    tag?: string;
    name: string;
    avatarUrl: string;
}

export interface Guild {
    id: string;
    name: string;
    iconUrl: string;
    roles: Role[];
    members: Member[];
}

export interface Member {
    id: string;
    username: string;
    discriminator: string;
    bot: boolean;

    roles: Role[];
    joinedAt: Date;
}

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