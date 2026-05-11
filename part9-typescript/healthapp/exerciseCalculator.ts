interface ExArgs {
  target: number;
  dailyExercises: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExArgs = (args: string[]): ExArgs => {
  if (args.length < 3) {
    throw new Error("Invalid number of arguments");
  }
  args.slice(2).forEach(arg => {
    if (isNaN(Number(arg))) {
      throw new Error("Arguments must be numbers");
    }
  });

  return {
    target: Number(args[2]),
    dailyExercises: args.slice(3).map(arg => Number(arg))
  }
};

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

try {
  const { target, dailyExercises } = parseExArgs(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error) {
  console.error(error);
}