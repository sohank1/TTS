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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae odio, illum aliquam quos expedita, consectetur quisquam hic quam corrupti ipsam nulla ducimus? Tempore molestias obcaecati repudiandae nesciunt vel error dolore!</p>
                    </div>
                </div>
                : null}
        </>
    )
}