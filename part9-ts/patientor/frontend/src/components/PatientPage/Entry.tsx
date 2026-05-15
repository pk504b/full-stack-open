import { assertNever } from "../../utils";
import { Entry, HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function ShowEntry({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case 'Hospital':
      return (
        <>
          discharge: {entry.discharge.date}
          <br />
          criteria: {entry.discharge.criteria}
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          employer: {entry.employerName}
          <br />
          sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </>
      );
    case 'HealthCheck':
      return (<Rating rating={entry.healthCheckRating} />
      );
    default:
      assertNever(entry);
  }
}

function Rating({ rating }: { rating: HealthCheckRating }) {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      assertNever(rating);
  }
}