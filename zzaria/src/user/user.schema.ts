import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    /**
     * The Discord id of the user.
     */
    @Prop({ unique: true })
    id: string;

    /**
     * The Discord tag of the user.
     */
    @Prop()
    tag: string;

    /**
     * The URL to the Discord avatar of the user.
     */
    @Prop({
        default:
            "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png",
        required: false,
    })
    avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
