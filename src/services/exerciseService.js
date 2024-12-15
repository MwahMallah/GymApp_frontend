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

export async function addExerciseServer(exercise, date) {
    const {data} = await axios.post(baseUrl, {name: exercise.name, sets: exercise.sets, type: exercise.type, date}, 
        {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }
    )

    return data;
}

export async function updateExerciseServer(exercise) {
    const {data} = await axios.put(`${baseUrl}/${exercise.id}`, exercise, 
        {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }
    )

    return data;
}

export async function removeExerciseServer(exercise) {
    const id = exercise.id;

    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    })
}