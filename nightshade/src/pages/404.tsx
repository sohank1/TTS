import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { NotFoundPage } from "../modules/not-found/NotFoundPage";

export default function NotFound() {
    return (
        <WaitForWsAndAuth>
            <NotFoundPage />
        </WaitForWsAndAuth>
    );
}
