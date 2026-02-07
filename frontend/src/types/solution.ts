export type Solution = {
  _id: string;
  hints: string[];
  myThought: string;
  engThought?: string;
  code: Record<string, string>; // ✅ dynamic languages
  youtubeLink?: string;
};
