export type AdminRequest = {
  _id: string;
  type: "feature" | "question";
  title: string;
  description: string;
  votes: number;
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
  type: RequestType;
  title: string;
  description: string;
  votes: { userId: string }[];
  completed: boolean;
  createdAt: string;
};
