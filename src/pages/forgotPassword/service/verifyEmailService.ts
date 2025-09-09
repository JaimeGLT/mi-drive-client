import axios from "axios"

export const verifyEmailService = async (email: string) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/forgotPassword/verifyMail/" + email);
    return response.data;
}