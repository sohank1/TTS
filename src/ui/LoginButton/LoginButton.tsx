import { Button } from "@material-ui/core";
import { LOGIN_API_URL } from "../../lib/constants";

export const LoginButton = () => (
    <div className="login-button-ui-component">
        <Button variant="contained" color="primary" href={LOGIN_API_URL}>Login</Button>
    </div>
)