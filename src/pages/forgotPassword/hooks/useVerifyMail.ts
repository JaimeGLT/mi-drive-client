import { useState } from "react"
import { verifyEmailService } from "../service/verifyEmailService";

export const useVerifyMail = () => {
    const [ emailResponse, setEmailResponse ] = useState<string>("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const verifyEmail = async (email: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await verifyEmailService(email);
            setEmailResponse(response);      
            return response;
        } catch (error: any) {
            console.log(error);
            
            setError(error.response.data.mensaje)
        } finally {
            setLoading(false);
        }
    }

    return { loading, verifyEmail, error, emailResponse, setError };
}