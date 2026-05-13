import data from '../data/patients.ts';
import type { Patient, PatientSanitized } from '../types.ts';

const getAll = (): Patient[] => {
  return data;
};

const getAllWithoutSSN = (): PatientSanitized[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

export default {
  getAll,
  getAllWithoutSSN
};