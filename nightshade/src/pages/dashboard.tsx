import { WaitForWsAndAuth } from "../modules/auth/WaitForWsAndAuth";
import { DashboardPage } from "../modules/dashboard/DashboardPage";

export default function Dashboard() {
    return (
        <WaitForWsAndAuth>
            <DashboardPage />
        </WaitForWsAndAuth>
    );
}
