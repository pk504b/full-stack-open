import data from '../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getAll = (): Diagnosis[] => {
  return data;
};

export default {
  getAll
};