class Dev {
    BASE_URL = "http://localhost:8000";
    CLIENT_URL = "http://localhost:4200";
    API_URL = `${this.BASE_URL}/api`;
    CDN_URL = "http://localhost:8000/cdn";
    URL_SHORTENER = "http://localhost:8000";
}

class Prod {
    BASE_URL = "https://tts-api-prod.herokuapp.com";
    CLIENT_URL = this.BASE_URL;
    API_URL = `${this.BASE_URL}/api`;
    CDN_URL = `${this.BASE_URL}/cdn`;
    URL_SHORTENER = "http://tts-app.netlify.app";
}

export const Environment =
    process.env.NODE_ENV === "production" ? new Prod() : new Dev();
