import axios from "axios"

export const verifyCodeService = async (code: string, email: string) => {
    const response = await axios.post(import.meta.env.VITE_API_URL + "/forgotPassword/verifyOtp/"+code+"/"+email);
    return response.data;
}