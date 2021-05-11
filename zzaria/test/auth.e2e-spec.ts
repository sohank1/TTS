import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
// import { AuthModule } from "./../src/auth/auth.module";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./../src/app.module";

const tokenRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

describe("Auth", () => {
    let app: INestApplication;
    let tokens: { accessToken: string; refreshToken: string };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("Gets access tokens for test user test/login?type=tokens", async () => {
        const r = await request(app.getHttpServer()).get("/api/test/login?type=tokens").expect(200);
        tokens = r.body;

        expect(tokens.accessToken).toMatch(tokenRegex);
        expect(tokens.refreshToken).toMatch(tokenRegex);

        console.log(tokens);
    });

    it("Gets test user data using tokens", async () => {
        const r = await request(app.getHttpServer())
            .get("/api/me")
            .set("X-Access-Token", tokens.accessToken)
            .set("X-Refresh-Token", tokens.refreshToken)
            .expect(200);

        expect(r.body.id).toEqual("688374951660486661");
        console.log(r.body);
    });

    it("Fails to get data using fake tokens", async () => {
        const r = await request(app.getHttpServer())
            .get("/api/me")
            .set("X-Access-Token", "fake-token")
            .set("X-Refresh-Token", "fake-token")
            .expect(401);

        expect(r.body.id).toBeUndefined();
    });

    afterAll(async () => {
        await app.close();
    });
});
