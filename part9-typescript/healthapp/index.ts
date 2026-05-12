import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ 
    weight: Number(weight),
    height: Number(height),
    bmi,
   });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  // eslint-disable-next-line
  if (isNaN(Number(target)) || daily_exercises.some((ex: number) => isNaN(ex))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line
  const result = calculateExercises(daily_exercises, Number(target));
  return res.json(result);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});