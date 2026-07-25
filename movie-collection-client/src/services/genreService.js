const apiUrl = "https://localhost:7001/api/genres";

export async function getGenres() {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not load genres.");
  }

  return await response.json();
}

export async function createGenre(genre) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  });

  if (!response.ok) {
    throw new Error("Could not create genre.");
  }

  return await response.json();
}

export async function updateGenre(id, genre) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  });

  if (!response.ok) {
    throw new Error("Could not update genre.");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export async function deleteGenre(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete genre.");
  }
}