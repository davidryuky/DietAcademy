export interface DietFormData {
  gender: 'female' | 'male';
  age: string;
  height: string;
  weight: string;
  targetWeight: string;
  months: string;
}

export interface ResultData {
    bmi: number;
    idealWeight: number;
    bmr: number;
    tdee: number;
    currentWeight: number;
    targetWeight: number;
    weightToLose: number;
    dailyIntake: number;
    months: number;
    warningMessage?: string;
}
