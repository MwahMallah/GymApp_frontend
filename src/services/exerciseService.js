import axios from "axios";
import { token } from "./loginService";

const baseUrl = "http://localhost:3005/api/exercise";

export async function getExercisesServer(date) {
    const {data} = await axios.get(`${baseUrl}?date=${date}`, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    });
    return data;
}

export async function addExerciseServer(name, date) {
    const {data} = await axios.post(baseUrl, {name, date}, 
        {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }
    )

    return data;
}

export async function removeExerciseServer(id) {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    })
}