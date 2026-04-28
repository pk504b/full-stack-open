const baseUrl = "http://localhost:3000/anecdotes";

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  return res.json();
};

export const addAnecdote = async (anecdote) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(anecdote),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to add anecdote");
  }
  return res.json();
};

export const updateAnecdote = async (id, anecdote) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(anecdote),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to update anecdote");
  }
  return res.json();
};

// export const voteAnecdote = async (id) => {
//   const res = await fetch(`${baseUrl}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (!res.ok) {
//     throw new Error("Failed to vote anecdote");
//   }
//   return res.json();
// };