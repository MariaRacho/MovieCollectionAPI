const apiUrl = "https://localhost:7001/api/movies";

export async function getMovies() {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not load movies.");
  }

  return await response.json();
}

export async function createMovie(movie) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Could not create movie.");
  }

  return await response.json();
}

export async function updateMovie(id, movie) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Could not update movie.");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export async function deleteMovie(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete movie.");
  }
}