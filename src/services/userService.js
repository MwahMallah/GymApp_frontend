import axios from "axios";
import { token } from "./loginService";

const baseUrl = "http://localhost:3005/api/user";

export async function getUser(id) {
    const {data} = await axios.get(`${baseUrl}/${id}`);
    return data;
}

export async function getAllUsersServer() {
    const {data} = await axios.get(baseUrl);
    return data;
}

export async function getAllUsersFilteredServer(filter) {
    const {data} = await axios.get(`${baseUrl}?username=${filter}`);
    return data;
}

export async function updateUserServer(user) {
    const {data} = await axios.put(`${baseUrl}`, user, {
        headers: {
            Authorization: token, 
            "Content-Type": "application/json"
        }
    });
    return data;
}

export async function addFriendServer(id) {
    console.log("token: ", token);
    try{
        const {data} = await axios.post(`${baseUrl}/friends/${id}`, {}, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });

        return data;
    } catch(e) {
        console.log(e);
    }
}

export async function removeFriendServer(id) {
    console.log("token: ", token);
    try{
        const {data} = await axios.delete(`${baseUrl}/friends/${id}`, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });
        
        return data;
    } catch(e) {
        console.log(e);
    }
}