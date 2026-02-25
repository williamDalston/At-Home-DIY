import fs from "fs";
import path from "path";

export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizRecommendation {
  range: [number, number];
  title: string;
  tips: string[];
  estimatedAnnualSavings: number;
}

export interface EnergyQuizData {
  questions: QuizQuestion[];
  recommendations: Record<string, QuizRecommendation>;
}

export function getEnergyQuizData(): EnergyQuizData {
  const filePath = path.join(
    process.cwd(),
    "content",
    "data",
    "energy-quiz-data.json"
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as EnergyQuizData;
}

export function getQuizResult(
  answers: Record<string, number>,
  data: EnergyQuizData
): QuizRecommendation & { totalScore: number } {
  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);

  for (const rec of Object.values(data.recommendations)) {
    if (totalScore >= rec.range[0] && totalScore <= rec.range[1]) {
      return { ...rec, totalScore };
    }
  }

  // fallback to highest tier
  const high = data.recommendations.high;
  return { ...high, totalScore };
}
