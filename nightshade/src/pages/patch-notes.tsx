import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { PatchNotesPage } from "../modules/patch-notes/PatchNotesPage";

export default function PatchNotes() {
    return (
        <WaitForWsAndAuth>
            <PatchNotesPage />
        </WaitForWsAndAuth>
    );
}
