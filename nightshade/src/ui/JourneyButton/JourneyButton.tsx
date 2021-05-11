import { Button } from "@material-ui/core";
import { inviteLink } from "../JoinButton/JoinButton";

export const JourneyButton = () => (
    <div className="journey-button-ui-component">
        <Button variant="contained" color="primary" target="_blank" href={inviteLink}>
            Start Your Journey
        </Button>
    </div>
);
