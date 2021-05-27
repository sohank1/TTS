export const OpCodes = {
    auth: "auth",
    "auth:success": "auth:success",
    "auth:error": "auth:error",
    "auth:new_tokens": "auth:new_tokens",
    "auth:login": "auth:login",
    "auth:logout": "auth:logout",

    "user:get": "user:get",
    "user:get:fetch_done": "user:get:fetch_done",
    "user:new": "user:new",
    "user:update": "user:update",
    "user:get_all": "user:get_all",
    "user:get_all:fetch_done": "user:get_all:fetch_done",

    "content:get": "content:get",
    "content:get:fetch_done": "content:get:fetch_done",
} as const;

export type OpCode = typeof OpCodes[keyof typeof OpCodes];

export interface UserResponseObject {
    _id: string;
    id: string;
    tag?: string;
    name: string;
    avatarUrl: string;
}

export interface ContentResponseObject {
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
