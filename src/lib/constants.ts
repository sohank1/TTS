export const loginRedirectPathKey = "login-redirect-path";

export let BASE_URL = "http://localhost:8000";
export let API_URL = `${BASE_URL}/api`;
export let LOGIN_API_URL = `${API_URL}/login`;


if (process.env.NODE_ENV === "production") {
    BASE_URL = "https://tts-api-prod.herokuapp.com";
    API_URL = `${BASE_URL}/api`;
    LOGIN_API_URL = `${API_URL}/login`;
}