import axios from "axios";

const API_URL = "https://swapi.py4e.com/api";

export const getCharacters = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}/people/?page=${page}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching characters:", error);
        throw error;
    }
}

export const getCharacter = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/people/${id}/`);
        return response.data;
    } catch (error) {
        console.log("Error fetching characters:", error);
        throw error;
    }
}