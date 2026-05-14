import type { CoursePart } from "../types";
import { Part } from "./Part";

interface Part {
  name: string;
  exerciseCount: number;
}

export const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};