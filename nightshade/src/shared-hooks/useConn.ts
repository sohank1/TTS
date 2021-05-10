import { useContext } from "react";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

export const useConn = () => useContext(WebSocketContext).conn;
