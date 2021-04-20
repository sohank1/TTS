export let BASE_URL = "http://localhost:8000";
export let API_URL = `${BASE_URL}/api`;


if (process.env.NODE_ENV === "production") {
    BASE_URL = "https://tts-api-prod.herokuapp.com";
    API_URL = `${BASE_URL}/api`;
}