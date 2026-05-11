interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExercises: number[], target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(exercise => exercise > 0).length;
  const average = dailyExercises.reduce((sum, exercise) => sum + exercise, 0) / periodLength;
  const success = average >= target;
  const rating = average > target ? 3 : success ? 2 : 1;
  const ratingDescription = success ? "Excellent" : "Not enough exercise";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))