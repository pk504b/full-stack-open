import { useEffect, useState } from "react";
import type { NonSensitiveDiaryEntry, Visibility, Weather } from "./types";
import diaryServices from "./services/diaryServices";

export default function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>("sunny");
  const [visibility, setVisibility] = useState<Visibility>("great");
  const [comment, setComment] = useState<string>("");

  const [error, setError] = useState<string>("");

  async function addDiaryEntry(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const entry = {
      id: entries.length + 1,
      date,
      weather,
      visibility,
      comment,
    };
    try {
      const res = await diaryServices.create(entry);
      setEntries([...entries, res]);
      setDate("");
      setWeather("sunny");
      setVisibility("great");
      setComment("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setTimeout(() => setError(""), 2000);
      } else {
        console.error(error);
      }
    }
  }

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
      <p><strong>Add a new entry</strong></p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addDiaryEntry}>
        <label>date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <label>weather
          <select value={weather} onChange={(e) => setWeather(e.target.value as Weather)}>
            <option value="sunny">sunny</option>
            <option value="rainy">rainy</option>
            <option value="cloudy">cloudy</option>
            <option value="stormy">stormy</option>
            <option value="windy">windy</option>
          </select>
        </label>
        <br />
        <label>visibility
          <select value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
            <option value="great">great</option>
            <option value="good">good</option>
            <option value="ok">ok</option>
            <option value="poor">poor</option>
          </select>
        </label>
        <br />
        <label>comment
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>

      <br />
      
      <p><strong>Date - Weather - Visibility</strong></p>
      {entries.map((entry) => (
        <p key={entry.id}>
          {entry.date} - {entry.weather} - {entry.visibility}
        </p>
      ))}
    </div>
  );
}