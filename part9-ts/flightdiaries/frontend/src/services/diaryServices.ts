import type { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  const response = await fetch(baseUrl);
  const data: NonSensitiveDiaryEntry[] = await response.json();
  return data;
};

const create = async (entry: DiaryEntry): Promise<DiaryEntry> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error(data.error.map((err: any) => "invalid " + err.path[0]).join(', '));
  }

  return response.json();
};

export default {
  getAll,
  create,
};