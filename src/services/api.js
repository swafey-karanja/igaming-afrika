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
}

export async function fetchCSRFToken() {
  //  Get CSRF token
  const tokenResponse = await fetch(
    `${API_CONFIG.BASE_URL}/security/csrf-token/`
  );
  if (!tokenResponse.ok) {
    throw new Error("Failed to get CSRF token");
  }
  return await tokenResponse.json();
}

export async function fetchExchangeRates() {
  const url =
    "https://v6.exchangerate-api.com/v6/be27f3528094fbe77bf956dd/latest/USD";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to get CSRF token");
  }
  // console.log({ response });
  return await response.json();
}
