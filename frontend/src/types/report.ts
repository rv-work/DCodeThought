export type AdminReport = {
  _id: string;
  title: string;
  description: string;
  screenshot?: string;
  resolved: boolean;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
};

export type ReportStatus = {
  _id: string;
  title: string;
  description: string;
  resolved: boolean;
  createdAt: string;
};
