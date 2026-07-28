import { API_BASE_URL } from "./apiConfig";

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token found.");
  }

  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });

  if (!response.ok) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    throw new Error("Session expired. Please login again.");
  }

  const data = await response.json();

  localStorage.setItem("accessToken", data.access);

  return data.access;
}

export async function authenticatedFetch(endpoint, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    try {
      accessToken = await refreshAccessToken();

      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
      });
    } catch (error) {
      window.location.href = "/login";
      throw error;
    }
  }

  if (!response.ok) {
    let errorMessage = "Request failed.";

    try {
      const data = await response.json();
      errorMessage = data.detail || data.error || errorMessage;
    } catch {
      // Response wasn't JSON
    }

    throw new Error(errorMessage);
  }

  return response;
}