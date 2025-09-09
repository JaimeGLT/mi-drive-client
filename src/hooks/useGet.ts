import { useState } from "react";
import { getService } from "../services/getService";
import type { File } from "../types/File";


export const useGet = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState("");
    const [ response, setResponse ] = useState<File[]>([]);

    const getRequest = async (url: string) => {
        setLoading(true);
        try {
            const data = await getService(url);
            setResponse(data);
            return response;
        } catch (error: any) {
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, getRequest, setResponse }
};

export const useGetFolder = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState("");
    const [ response, setResponse ] = useState<File[]>([]);

    const getRequest = async (url: string) => {
        setLoading(true);
        try {
            const data = await getService(url);
            setResponse(data);
            return data;
        } catch (error: any) {
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, getRequest, setResponse }
};