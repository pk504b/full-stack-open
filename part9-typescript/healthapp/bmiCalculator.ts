const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74))