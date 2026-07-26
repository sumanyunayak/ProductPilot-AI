import { API_BASE_URL } from "./apiConfig";

// -----------------------------
// Get all product ideas
// -----------------------------
export async function getProductIdeas() {
  const response = await fetch(`${API_BASE_URL}/ideas/`);

  if (!response.ok) {
    throw new Error("Failed to fetch product ideas.");
  }

  return await response.json();
}

// -----------------------------
// Create a new product idea
// -----------------------------
export async function createProductIdea(ideaData) {
  const response = await fetch(`${API_BASE_URL}/ideas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ideaData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product idea.");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

// -----------------------------
// Get a single product idea
// -----------------------------
export async function getProductIdea(id) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch product idea.");
  }

  return await response.json();
}

// -----------------------------
// Update a product idea
// -----------------------------
export async function updateProductIdea(id, formData) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to update product idea.");
  }

  return await response.json();
}

// -----------------------------
// Delete a product idea
// -----------------------------
export async function deleteProductIdea(id) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product idea.");
  }
}

// -----------------------------
// Analyze a product idea
// -----------------------------
export async function analyzeProductIdea(id) {
  const response = await fetch(`${API_BASE_URL}/ideas/${id}/analyze/`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to analyze product idea.");
  }

  return await response.json();
}