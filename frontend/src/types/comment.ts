export type Vote = {
  userId: string;
  value: 1 | -1;
};

export type Reply = {
  _id: string;
  userId: { _id: string; name: string };
  text: string;
  votes: Vote[];
  createdAt: string;
};

export type Comment = {
  _id: string;
  userId: { _id: string; name: string };
  text: string;
  votes: Vote[];
  replies: Reply[];
  createdAt: string;
};
