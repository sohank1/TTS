import { MetaController } from "../display/MetaController";
import { defaultPatchNotes } from "./defaultPatchNotes";

const names = defaultPatchNotes
    .map((p, i) => {
        if (i === defaultPatchNotes.length - 1) return `and ${p.name}`;
        return `${p.name}, `;
    })
    .join("");

export const PatchNotesMetaController = () => {
    return (
        <MetaController title="Patch Notes" description={`See the newest patch notes from creators. See ${names}`} />
    );
};
