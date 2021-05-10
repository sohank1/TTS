import io from "socket.io-client";
import { environment } from "src/environments/environment";

export const socket = io(environment.httpEndpoints.URL);
