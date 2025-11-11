// src/api/apiClient.ts
export const API_CONFIG = {
    BASE_URL: "https://events.igamingafrika.com/api",
    TOKEN: import.meta.env.VITE_PUBLIC_API_TOKEN,
};

export async function fetchDataFromApi(endpoint) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/${endpoint}/`, {
        headers: {
            Authorization: `Token ${API_CONFIG.TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }

    return await response.json();
};
