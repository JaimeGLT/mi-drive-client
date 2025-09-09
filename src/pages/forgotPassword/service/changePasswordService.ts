import axios from "axios"

export type newCredentials = {
    password: string;
    repeatPassword: string;
}

export const changePasswordService = async (email: string, credentials: newCredentials) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/forgotPassword/changePassword/"+email, credentials);
    return response.data;
}