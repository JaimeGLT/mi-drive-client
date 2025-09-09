import { useState } from "react";
import type { File } from "../types/File";
import { updateService } from "../services/updateService";


export const useUpdate = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState("");
    const [ response, setResponse ] = useState<File[]>([]);

    const updateRequest = async (url: string, body: any) => {
        setLoading(true);
        try {
            const data = await updateService(url, body);
            setResponse(data);
            return response;
        } catch (error: any) {
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, updateRequest, setResponse }
};