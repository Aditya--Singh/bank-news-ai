import apiClient from "./client";

export const submitFeedback = async ({
    username,
    role,
    relevance,
    accuracy,
    usefulness,
    clarity,
    timeliness,
    comments,
}) => {
    const response = await apiClient.post("/api/feedback", {
        username,
        role,
        relevance,
        accuracy,
        usefulness,
        clarity,
        timeliness,
        comments,
    });

    return response.data;
};

export const getMonthlyFeedback = async () => {
    const response = await apiClient.get("/api/feedback/monthly");

    return response.data;
};