export type Solution = {
  _id: string;
  problemId: {
    _id: string;
    problemNumber: number;
    title: string;
  };
  hints: string[];
  myThought: string;
  engThought?: string;

  codeBlocks?: { language: string; code: string }[];

  youtubeLink?: string;
};
