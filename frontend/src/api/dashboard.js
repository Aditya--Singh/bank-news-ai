import apiClient from "./client";

export const getDashboardSummary = async () => {
    const response = await apiClient.get("/api/dashboard/summary");
    return response.data;
};

export const getTopBanks = async () => {
    const response = await apiClient.get("/api/dashboard/top-banks");
    return response.data;
};

export const getTopTopics = async () => {
    const response = await apiClient.get("/api/dashboard/top-topics");
    return response.data;
};