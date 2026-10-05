import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    // baseURL: "",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const user = JSON.parse(
            localStorage.getItem("bankNewsUser") || "null"
        );

        if (user?.accessToken) {
            config.headers.Authorization =
                `Bearer ${user.accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("bankNewsUser");

            // Notify the application that the session is no longer valid
            window.dispatchEvent(new Event("auth-expired"));
        }

        return Promise.reject(error);
    },
);

export default apiClient;