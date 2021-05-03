import { useState } from "react";
import { Button } from "@material-ui/core";

export const ServerDownModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {isOpen ?
                <div className="server-down-modal-ui-component">
                    <div className="modal">
                        <section>
                            <Button onClick={() => setIsOpen(false)} id="close">
                                <img src="assets/close.svg" />
                            </Button>
                        </section>
                        <h1>Failed to Establish Connection to Websocket Server</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ipsam possimus voluptatem error sint ipsum explicabo alias rerum nihil totam eaque, optio facilis delectus nostrum maiores voluptas sed nobis quaerat?</p>
                    </div>
                </div>
                : null}
        </>
    )
}