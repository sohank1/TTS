import { Button } from "@material-ui/core";

export const inviteLink = 'https://discord.gg/RNTemwY';

export const JoinButton = () => (
    <div className="join-button-ui-component">
        <Button variant="contained" color="primary" href={inviteLink}>Join</Button>
    </div>
)