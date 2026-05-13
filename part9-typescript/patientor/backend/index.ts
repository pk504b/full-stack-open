import express from 'express';
import cors from 'cors';
import diagnosisRouter from './src/routes/diagnoses.ts';
import patientsRouter from './src/routes/patients.ts';
import { z } from "zod";

const errorMiddleware = (error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/ping', (_req, res) => {
  res.send('pong');
});
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.use(errorMiddleware);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});