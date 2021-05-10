import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class File extends Document {
    /**
     * The path of the cdn to this file.
     * /cdn/path
     */
    @Prop()
    path: string;

    /**
     * The url to the file.
     */
    @Prop()
    url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
