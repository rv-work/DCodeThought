export type AdminRequest = {
  _id: string;
  type: "feature" | "question";
  title: string;
  description: string;
  votes: { userId: string }[]; // FIXED
  completed: boolean;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
};

export type RequestType = "question" | "feature";

export type PublicRequest = {
  _id: string;
  type: "question" | "feature";
  title: string;
  description: string;
  leetcodeLink?: string | null;
  votes: { userId: string }[];
  completed: boolean;
  createdAt: string;
};
