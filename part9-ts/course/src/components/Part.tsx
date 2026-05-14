import type { CoursePart } from "../types";
import { assertNever } from "../utils";

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name} </strong>
          <br />
          Exercises: {part.exerciseCount}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>{part.name} </strong> <br /> Exercises: {part.exerciseCount}{" "}
          <br /> Group project count: {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>{part.name} </strong> <br /> Exercises:{part.exerciseCount}{" "}
          <br /> Background material: {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <strong>{part.name} </strong> <br /> Exercises:{part.exerciseCount}{" "}
          <br /> Requirements: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};
