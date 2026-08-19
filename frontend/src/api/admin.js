import apiClient from "./client";

export async function runNewsIngestion() {
    const response = await apiClient.post(
        "/api/admin/news/ingest",
    );

    return response.data;
}