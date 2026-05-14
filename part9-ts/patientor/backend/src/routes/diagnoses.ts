import express from 'express';
import diagnosesService from '../services/diagnoses.ts';

const router: express.Router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnosesService.getAll();
  res.json(data);
});

export default router;