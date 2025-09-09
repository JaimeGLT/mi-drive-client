import axiosClient from "../utlis/axiosCustom";

export const updateService = async (url: string, body: any) => {
    const response = axiosClient.put(url, body);
    return (await response).data;
};