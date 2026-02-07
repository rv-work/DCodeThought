export type Solution = {
  _id: string;
  problemId: {
    _id: string;
    problemNumber: number;
    title: string;
  };
  myThought: string;
  engThought?: string;
  hints: string[];
  code?: Record<string, string>;
  youtubeLink?: string;
};
