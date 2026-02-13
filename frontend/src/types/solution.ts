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
  code?: Record<string, string>;

  youtubeLink?: string;
};
