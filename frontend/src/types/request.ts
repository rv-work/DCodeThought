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
