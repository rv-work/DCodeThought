import type { PublicProblem } from "./problem";

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

export type PublicContest = {
  contestNumber: number;
  contestName: string;
  contestDate: string;
};

export type ContestDetail = {
  contestNumber: number;
  contestName: string;
  contestDate: string;
  problems: PublicProblem[];
};
