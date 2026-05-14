import express from 'express';
import patientsService from '../services/patients.ts';
import { NewPatientSchema } from "../types.ts";

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getAllSanitized();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'patient not found' });
  }
});

router.post('/', (req, res) => {
  const newPatient = NewPatientSchema.parse(req.body);
  const addedPatient = patientsService.create(newPatient);
  res.json(addedPatient);
});

export default router;