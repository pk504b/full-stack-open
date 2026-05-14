import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Gender, Patient } from "../types";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

export default function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
      console.log(patient);
    };

    void fetchPatient();
  }, [id]);

  return (
    <div>
      <Typography variant="h5">
          {patient?.name}
          {patient?.gender === Gender.Male && <MaleIcon />}
          {patient?.gender === Gender.Female && <FemaleIcon />}
          {patient?.gender === Gender.Other && <TransgenderIcon />}
        </Typography>
        <Typography variant="body1">
          ssn: {patient?.ssn} <br />
          occupation: {patient?.occupation} <br />
          date of birth: {patient?.dateOfBirth}
        </Typography>
    </div>
  );
}