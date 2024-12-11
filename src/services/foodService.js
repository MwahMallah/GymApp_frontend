import axios from "axios";
import { token } from "./loginService";

const baseUrl = "http://localhost:3005/api/food";

export async function getFoodServer(date) {
    const {data} = await axios.get(`${baseUrl}?date=${date}`, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    });
    return data;
}

export async function addFoodServer(name, date) {
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

export async function removeFoodServer(id) {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        }
    })
}