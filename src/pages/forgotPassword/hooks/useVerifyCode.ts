import { useState } from "react"
import { verifyCodeService } from "../service/verifyCodeService";

export const useVerifyCode = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");

    const verifyCode = async (code: string, email: string) => {
        setLoading(true);

        try {
            const response = await verifyCodeService(code, email);
            return response;
        } catch (error: any) {
            console.log(error);
            
            setError(error?.response?.data?.mensaje);
        } finally {
            setLoading(false);
        }
    }

    return { verifyCode, loading, error, setError }
}