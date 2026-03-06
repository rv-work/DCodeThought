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

  // 🔥 normalized frontend shape
  codeBlocks?: CodeBlock[];

  youtubeLink?: string;
};

export type CodeBlock = {
  language: string;
  code: string;
};
