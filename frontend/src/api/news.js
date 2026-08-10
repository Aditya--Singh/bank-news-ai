import apiClient from "./client";

export const getNews = async ({
    page = 1,
    pageSize = 20,
    source,
    sentiment,
    importance,
    riskLevel,
    bank,
} = {}) => {
    const params = {
        page,
        page_size: pageSize,
    };

    if (source) params.source = source;
    if (sentiment) params.sentiment = sentiment;
    if (importance) params.importance = importance;
    if (riskLevel) params.risk_level = riskLevel;
    if (bank) params.bank = bank;

    const response = await apiClient.get("/api/news", {
        params,
    });

    return response.data;
};
