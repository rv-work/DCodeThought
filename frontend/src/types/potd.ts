export type PotdProblem = {
  _id: string;
  problemNumber: number;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  potdDate: string;
};
