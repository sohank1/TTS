import { useState, useRef, useEffect } from "react";
import { Button, ClickAwayListener } from "@material-ui/core";
import { CloseIcon } from "../../icons/CloseIcon";
import { useWhenIsServerUp } from "../../modules/ws/useWhenIsServerUp";

export const ServerDownModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const modal = useRef<HTMLDivElement>(null);
    const serverUpAt = useWhenIsServerUp();

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, []);

    const close = () => {
        modal.current.classList.add("out");
        document.body.style.overflow = "auto";

        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    return isOpen ? (
        <ClickAwayListener onClickAway={close}>
            <div className="server-down-modal-ui-component">
                <div ref={modal} className="modal">
                    <section>
                        <Button onClick={close} id="close">
                            <CloseIcon />
                        </Button>
                    </section>

                    <div className="text">
                        <h1>
                            Failed to Establish Connection to Websocket Server
                        </h1>
                        <p>
                            The Websocket Server is currently down. Because of
                            this, most of the website will no longer function
                            properly. Please return at {serverUpAt} to properly
                            use the website.
                        </p>
                        <div className="understand">
                            <Button onClick={close}>I Understand</Button>
                        </div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    ) : null;
};
