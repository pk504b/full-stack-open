interface ArgsBmi {
  height: number;
  weight: number;
}

const parseArgsBmi = (args: string[]): ArgsBmi => {
  if (args.length != 4) {
    throw new Error("Invalid number of arguments");
  }

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Arguments must be numbers");
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height < 0 || weight < 0) {
    throw new Error("Height and weight must be positive");
  }
  const m = height / 100;
  const bmi = weight / (m * m);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  if (process.argv[1] === import.meta.filename) {
    const { height, weight } = parseArgsBmi(process.argv);
    console.log(calculateBmi(height, weight));
  }
} catch (error) {
  console.error(error);
}