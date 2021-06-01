import { connect } from "..";
import fetch from "node-fetch";

const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

describe("Auth", () => {
    let tokens: { accessToken: string; refreshToken: string };

    beforeAll(async () => {
        tokens = await (await fetch("http://localhost:8000/api/test/login?type=tokens")).json();

        expect(tokens.accessToken).toMatch(tokenRegex);
        expect(tokens.refreshToken).toMatch(tokenRegex);

        console.log(tokens);
    });

    it("Connects to the websocket server and checks me data", () => {
        return new Promise<void>(async (res) => {
            const conn = await connect(tokens.accessToken, tokens.refreshToken, {
                url: "http://localhost:8000",
                onUser: async (u) => {
                    console.log(u);
                    expect(u.id).toEqual("688374951660486661");
                    conn.close();
                    res();
                },
            });
        });
    });

    it("Connects to the websocket server with bad tokens", () => {
        return new Promise<void>(async (res) => {
            const conn = await connect("fake-token", "fake-token", {
                url: "http://localhost:8000",
                onClearTokens: () => {
                    expect(conn.user).toBeFalsy();
                    conn.close();
                    res();
                },
            });
        });
    });
});
