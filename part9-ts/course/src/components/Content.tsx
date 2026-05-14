interface Part {
  name: string;
  exerciseCount: number;
}

export const Content = ({ parts }: { parts: Part[] }) => {
  return (
    <>
      {parts.map(part => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </>
  );
};