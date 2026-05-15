import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => void;
  allDiagnoses: Diagnosis[];
}

export default function NewEntry({ addEntry, allDiagnoses }: Props) {
  const [type, setType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const submitEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
    };

    switch (type) {
      case "HealthCheck":
        addEntry({
          ...baseEntry,
          type,
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        });
        break;
      case "Hospital":
        addEntry({
          ...baseEntry,
          type,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        addEntry({
          ...baseEntry,
          type,
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
        });
        break;
    }
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthCheckRating(HealthCheckRating.Healthy);
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };

  return (
    <form
      onSubmit={submitEntry}
      style={{ border: "dashed", padding: "1rem", marginBottom: "1rem" }}
    >
      <FormControl fullWidth style={{ marginBottom: "1rem" }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={({ target }) => setType(target.value)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        type="date"
        label="Date"
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
      {type === "HealthCheck" && (
        <FormControl fullWidth style={{ marginBottom: "1rem" }}>
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value) as HealthCheckRating)
            }
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}
      <Select
        multiple
        fullWidth
        label="Diagnosis Codes"
        value={diagnosisCodes}
        onChange={({ target }) => {
          setDiagnosisCodes(
            typeof target.value === "string"
              ? target.value.split(",")
              : target.value,
          );
        }}
      >
        {allDiagnoses?.map(({ name, code }) => (
          <MenuItem key={code} value={code}>
            {code} - {name}
          </MenuItem>
        ))}
      </Select>

      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}

      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}

      <Button type="submit" variant="contained" color="primary">
        Add New Entry
      </Button>
    </form>
  );
}
