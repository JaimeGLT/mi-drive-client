import { useState } from "react"
import { adaptToken, type TokenPair } from "../adapters/loginAdapter";
import { loginService } from '../services/authService';

export const useLogin = () => {
    const [ token, setToken] = useState<TokenPair | null>(null);
    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState<String | null>(null);

    const login = async (identifier: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginService({identifier, password});     
            const adaptedToken = adaptToken(data);
            setToken(adaptedToken);

            return adaptedToken;
        } catch (error: any) {
            setError(error.message || "Error desconocido");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { token, login, loading, error };
}
