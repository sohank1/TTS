import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { PatchNotesMetaController } from "../modules/patch-notes/PatchNotesMetaController";
import { PatchNotesPage } from "../modules/patch-notes/PatchNotesPage";

export default function PatchNotes() {
    return (
        <>
            <PatchNotesMetaController />
            <WaitForWsAndAuth>
                <PatchNotesPage />
            </WaitForWsAndAuth>
        </>
    );
}
