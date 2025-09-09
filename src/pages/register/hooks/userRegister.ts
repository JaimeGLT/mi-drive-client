import { useState } from "react"
import { registerService, type registerData } from "../service/registerService";

export const useRegister = () => {
    const [ user, setUser ] = useState<registerData | null>(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<any>(null);

    const register = async (data: registerData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerService(data);
            setUser(response)
            return response;
        } catch (err: any) { 
            setError(err.response.data)
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, register };
}