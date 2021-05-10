import { Role } from "./role.type";

export interface Member {
    id: string;
    username: string;
    discriminator: string;
    bot: boolean;

    roles: Role[];
    joinedAt: Date;
}
