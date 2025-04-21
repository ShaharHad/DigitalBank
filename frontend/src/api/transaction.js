import axiosInstance from "./axiosInstance";

export const depositApi = async (data) => {
  const response = await axiosInstance.post("/transaction/deposit", data);
  return response.data;
};

export const withdrawApi = async (data) => {
  const response = await axiosInstance.post("/transaction/withdraw", data);
  return response.data;
};

export const transferApi = async (data) => {
  const response = await axiosInstance.post("/transaction/transfer", data);
  return response.data;
};

export const getTransactions = async (data) => {
  const response = await axiosInstance.get(`/transaction/${data}`);
  return response.data;
}