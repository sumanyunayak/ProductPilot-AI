import { API_BASE_URL } from "./apiConfig";

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    if (!response.ok) {
      const message =
        data.detail || Object.values(data)[0]?.[0] || "Registration failed.";

      throw new Error(message);
    }
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data.detail || Object.values(data)[0]?.[0] || "Login failed.";

    throw new Error(message);
  }

  return data;
}
