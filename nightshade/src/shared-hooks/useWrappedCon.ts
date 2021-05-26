import { useContext } from "react";
import { wrap } from "@tts/crustina";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

export const useWrappedConn = () => wrap(useContext(WebSocketContext).conn);
