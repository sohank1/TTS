import { useState } from "react";
import { Button } from "@material-ui/core";

export const ServerDownModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="server-down-modal-ui-component">
            <div className="modal">
                {/* <section>
                <Button onClick={() => setIsOpen(false)} id="close">
                    <img src="assets/close.svg" />
                </Button>
            </section> */}
                <h1>Failed to Establish Connection to Websocket Server</h1>
            </div>
        </div>
    )
}