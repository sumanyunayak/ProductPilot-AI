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
async function handleApiError(response) {
  let errorMessage = "Something went wrong.";

  try {
    const data = await response.json();

    errorMessage = data.detail || data.error || data.message || errorMessage;
  } catch {
    // Response wasn't JSON
  }

  switch (response.status) {
    case 400:
      throw new Error(errorMessage);

    case 401:
      throw new Error("Authentication required.");

    case 403:
      throw new Error("You don't have permission to perform this action.");

    case 404:
      throw new Error("Requested resource not found.");

    case 500:
      throw new Error("Server error. Please try again later.");

    default:
      throw new Error(errorMessage);
  }
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
    await handleApiError(response);
  }

  return response;
}
