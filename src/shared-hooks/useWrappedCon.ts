import { useContext } from "react";
import { wrap } from "../modules/ws/client";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

export const useWrappedConn = () => wrap(useContext(WebSocketContext).conn)