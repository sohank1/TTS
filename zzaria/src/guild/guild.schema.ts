import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Member, Role } from "@tts/axeroni";
import { Document } from "mongoose";

@Schema()
export class Guild extends Document {
    /**
     * The id of the TTS Server.
     */
    @Prop({ unique: true })
    id: string;

    /**
     * The name of the TTS Server.
     */
    @Prop()
    name: string;

    /**
     * The URL to the icon of the TTS Server.
     */
    @Prop({
        default: "https://cdn.discordapp.com/icons/570349873337991203/7f945e4de66e287e33e029043c99dd76.png?size=2048",
        required: false,
    })
    iconUrl: string;

    @Prop()
    roles: Role[];

    @Prop()
    members: Member[];
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
