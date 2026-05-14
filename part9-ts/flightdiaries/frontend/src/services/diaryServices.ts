import type { NonSensitiveDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await fetch(baseUrl);
  const data: NonSensitiveDiaryEntry[] = await response.json();
  return data;
};
export default {
  getAll,
};