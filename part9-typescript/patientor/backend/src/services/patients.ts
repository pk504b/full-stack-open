import data from '../data/patients.ts';
import type { Patient } from '../types.ts';

const getAll = (): Patient[] => {
  return data;
};

export default {
  getAll,
};