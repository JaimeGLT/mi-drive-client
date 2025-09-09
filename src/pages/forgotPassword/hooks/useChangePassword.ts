import { useState } from "react"
import { changePasswordService, type newCredentials } from "../service/changePasswordService";

export const useChangePassword = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>("");

    const changePassword = async (email: string, data: newCredentials) => {
        setLoading(true)
        try {
            const response = await changePasswordService(email, data);
            return response;
        } catch (error: any) {
            setError(error?.response?.data?.mensaje)
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, changePassword, setError }
}