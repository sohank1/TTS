"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
class Dev {
    constructor() {
        this.BASE_URL = "http://localhost:8000";
        this.CLIENT_URL = "http://localhost:3000";
        this.API_URL = `${this.BASE_URL}/api`;
    }
}
class Prod {
    constructor() {
        this.BASE_URL = "https://tts-api-prod.herokuapp.com";
        this.CLIENT_URL = this.BASE_URL;
        this.API_URL = `${this.BASE_URL}/api`;
    }
}
exports.Environment = process.env.NODE_ENV === "production" ? new Prod() : new Dev();
//# sourceMappingURL=Environment.js.map