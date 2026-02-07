export type Problem = {
  _id: string;
  problemNumber: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "normal" | "potd" | "contest" | "requested";
};
