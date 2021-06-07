import { FC, useEffect, useRef } from "react";

interface LoadingAnimationProps {
    show: boolean;
}

export const LoadingAnimation: FC<LoadingAnimationProps> = ({ show }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!show) {
            ref.current?.classList.add("remove");
            setTimeout(() => {
                ref.current?.classList.remove("remove");
            }, 1500);
        }
    }, []);

    return (
        <div ref={ref} className="loading-animation-ui-component">
            <div className="fade">
                <img src="assets/tts-logo.png" />
            </div>
            <h1>Waiting for server...</h1>
        </div>
    );
};
