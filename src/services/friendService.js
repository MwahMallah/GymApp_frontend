import axios from "axios";

const baseUrl = "http://localhost:3005/api/user";

export async function getFriendServer(friendId) {
    try {
        const {data} = await axios.get(`${baseUrl}/${friendId}`);
        return data;
    } catch(e) {
        console.error(e);
        throw new Error("Bad credentials");
    }
}
