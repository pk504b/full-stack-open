import express from 'express';
import patientsService from '../services/patients.ts';
import parseNewPatient from '../utils/parseNewPatient.ts';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getAllSanitized();
  res.json(data);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = parseNewPatient(req.body);
  const newPatient = patientsService.create({name, dateOfBirth, gender, occupation, ssn});
  res.json(newPatient);
});

export default router;