const API_URL = "https://localhost:7001/api/loans";

export async function getLoans() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not load loans.");
  }

  return await response.json();
}

export async function getLoanById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Could not load the loan.");
  }

  return await response.json();
}

export async function createLoan(loan) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loan),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Could not create the loan.");
  }

  return await response.json();
}

export async function updateLoan(id, loan) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loan),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Could not update the loan.");
  }
}

export async function deleteLoan(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Could not delete the loan.");
  }
}