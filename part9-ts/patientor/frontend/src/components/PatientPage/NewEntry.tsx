import { Button, TextField } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => void;
}

export default function NewEntry({ addEntry }: Props) {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  
  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>();

  const submitEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    addEntry({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(',').map(c => c.trim()) : undefined,
      healthCheckRating: healthCheckRating!,
    });
  };

  return (
    <form onSubmit={submitEntry} style={{ border: "dashed", padding: "1rem", marginBottom: "1rem" }}>
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Health Check Rating (0-3)"
        fullWidth
        value={healthCheckRating}
        onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Diagnosis Codes (comma separated)"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </form>
  );
}