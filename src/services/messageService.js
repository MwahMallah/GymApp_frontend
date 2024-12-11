import { io } from "socket.io-client";
import axios from "axios";

const baseUrl = "http://localhost:3005";

export const socket = io(baseUrl, {
    autoConnect: false
});

export const getMessagesFromChat = (from, to) => {
    const roomName = [from, to].sort().join('-');

    return axios.get(`${baseUrl}/api/messages/${roomName}`)
        .then(response => response.data) 
        .catch(error => {
            console.error('Error fetching messages:', error);
            throw error; 
        });
};

export const getUnseenMessages = (userId) => {
    return axios.get(`${baseUrl}/api/messages/unseen/${userId}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching messages:', error);
            throw error; 
        });
}

export const sawMessage = (msgId) => {
    return axios.put(`${baseUrl}/api/messages/unseen/${msgId}`);
}