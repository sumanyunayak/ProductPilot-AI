import { API_BASE_URL } from "./apiConfig";

export async function authenticatedFetch(endpoint, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = "Request failed.";

    try {
      const data = await response.json();
      errorMessage = data.detail || data.error || errorMessage;
    } catch {
      // Ignore if the response isn't JSON
    }

    throw new Error(errorMessage);
  }

  return response;
}