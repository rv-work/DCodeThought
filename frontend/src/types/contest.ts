export type ContestProblem = {
  _id: string;
  problemNumber: number;
  title: string;
};

export type Contest = {
  _id: string;
  contestNumber: number;
  contestName: string;
  contestDate: string;
  problems: ContestProblem[];
};
