import { connect, Connection } from "crustina";
import { Environment } from "../environment/Environment";

let conn: Connection;

connect(process.env.ACCESS_TOKEN, process.env.REFRESH_TOKEN, {
    url: Environment.BASE_URL,
}).then((c) => (conn = c));

export const useConn = () => conn;
