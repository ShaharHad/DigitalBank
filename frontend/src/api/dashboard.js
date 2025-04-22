import axiosInstance from "./axiosInstance";

export const dashboardApi = async (data) => {
  const response = await axiosInstance.get(`/dashboard/${data}`);
  return response.data.data;
};