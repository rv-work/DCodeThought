export type PotdProblem = {
  _id: string;
  date: string;
  problem: {
    _id: string;
    problemNumber: number;
    title: string;
  };
};
