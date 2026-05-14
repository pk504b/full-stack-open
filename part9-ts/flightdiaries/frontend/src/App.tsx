import { useEffect, useState } from "react";
import type { NonSensitiveDiaryEntry } from "./types";
import diaryServices from "./services/diaryServices";

export default function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await diaryServices.getAll();
      setEntries(data);
    };
    fetchData();
  }, []);

  if (!entries.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><strong>Date - Weather - Visibility</strong></p>
      {entries.map((entry) => (
        <p>
          {entry.date} - {entry.weather} - {entry.visibility}
        </p>
      ))}
    </div>
  );
}