import axios from "axios"

export interface registerData {
    username: string;
    email: string;
    password: string;
    role: string;
}

export const registerService = async (data: registerData) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/api/auth/register", data);
    return response.data;
}