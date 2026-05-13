import express from 'express';
import patientsService from '../services/patients.ts';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  const data = patientsService.getAll();
  res.json(data);
});

export default router;