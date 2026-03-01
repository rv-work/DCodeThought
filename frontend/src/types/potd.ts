export type PotdProblem = {
  _id: string;
  problemNumber: number;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  potdDate: string;
};

export type AdminPotd = {
  _id: string;
  date: string;
  problem: {
    _id: string;
    problemNumber: number;
    title: string;
    slug: string;
    difficulty: "Easy" | "Medium" | "Hard";
  };
};
