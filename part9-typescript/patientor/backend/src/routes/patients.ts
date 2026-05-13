import express from 'express';
import patientsService from '../services/patients.ts';
import { NewPatientSchema } from "../types.ts";

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getAllSanitized();
  res.json(data);
});

router.post('/', (req, res) => {
  const newPatient = NewPatientSchema.parse(req.body);
  const addedPatient = patientsService.create(newPatient);
  res.json(addedPatient);
});

export default router;