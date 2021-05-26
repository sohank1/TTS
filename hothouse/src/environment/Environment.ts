class Dev {
    BASE_URL = "http://localhost:8000";
    CLIENT_URL = "http://localhost:3000";
    API_URL = `${this.BASE_URL}/api`;
}

class Prod {
    BASE_URL = "https://tts-api-prod.herokuapp.com";
    CLIENT_URL = this.BASE_URL;
    API_URL = `${this.BASE_URL}/api`;
}

export const Environment = process.env.NODE_ENV === "production" ? new Prod() : new Dev();
