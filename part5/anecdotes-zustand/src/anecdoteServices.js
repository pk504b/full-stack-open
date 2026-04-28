const baseUrl = "http://localhost:3000/anecdotes";

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};