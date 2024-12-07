import axios from "axios";

export let token = null;

export async function setToken(newToken) {
    token = `Bearer ${newToken}`;
}

const baseUrl = "http://localhost:3005/api/login";

export async function loginUserServer(username, password) {
    try {
        const {data} = await axios.post(baseUrl, { username, password });
        return data;
    } catch(e) {
        console.error(e);
        throw new Error("Bad credentials");
    }
}
