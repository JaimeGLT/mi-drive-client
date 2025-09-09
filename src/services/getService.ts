import axiosClient from "../utlis/axiosCustom";

export const getService = async (url: string) => {
    const response = axiosClient.get(url);
    return (await response).data;
};
