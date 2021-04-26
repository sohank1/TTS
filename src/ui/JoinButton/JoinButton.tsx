import { Button } from "@material-ui/core";

export const inviteLink = 'https://discord.gg/RNTemwY';

export const JoinButton = () => (
    <div className="join-button-ui-component">
        <Button variant="contained" color="primary" target="_blank" href={inviteLink}>Join</Button>
    </div>
)
