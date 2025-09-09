import axiosClient from "../utlis/axiosCustom";

export const uploadFileService = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosClient.post("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
