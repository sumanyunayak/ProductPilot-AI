import { authenticatedFetch } from "./authFetch";
// -----------------------------
// Get all product ideas
// -----------------------------
export async function getProductIdeas() {
  const response = await authenticatedFetch("/ideas/");

  return response.json();
}

// -----------------------------
// Create a new product idea
// -----------------------------
export async function createProductIdea(ideaData) {
  const response = await authenticatedFetch("/ideas/", {
    method: "POST",

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
  const response = await authenticatedFetch(`/ideas/${id}/`);

  return await response.json();
}

// -----------------------------
// Update a product idea
// -----------------------------
export async function updateProductIdea(id, formData) {
  const response = await authenticatedFetch(`/ideas/${id}/`, {
    method: "PUT",
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
  const response = await authenticatedFetch(`/ideas/${id}/`, {
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
  const response = await authenticatedFetch(`/ideas/${id}/analyze/`, {
    method: "POST",
  });

  return await response.json();
}
