export interface FeedComment {
  _id: string;
  userId: { _id: string; name: string; username: string; badges?: string[] };
  text: string;
  createdAt: string;
}

export interface FeedPostType {
  _id: string;
  userId: {
    _id: string;
    name: string;
    username: string;
    college?: string;
    badges?: string[];
  };
  questionNumber: number;
  title: string;
  leetcodeLink: string;
  content: string;
  images: string[];
  tags: string[];
  likes: string[];
  comments: FeedComment[];
  createdAt: string;
}

export interface FeedResponse {
  success: boolean;
  posts: FeedPostType[];
  hasMore: boolean;
}
