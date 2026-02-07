import api from "./axios";
import type { Comment } from "@/types/comment";

export const getComments = async (slug: string) => {
  const res = await api.get(`/api/comments/${slug}`);
  return res.data as { success: boolean; comments: Comment[] };
};

export const addComment = async (slug: string, text: string) => {
  const res = await api.post(`/api/comments/${slug}`, { text });
  return res.data;
};

export const addReply = async (commentId: string, text: string) => {
  const res = await api.post(`/api/comments/reply/${commentId}`, { text });
  return res.data;
};

export const voteComment = async (commentId: string, value: "up" | "down") => {
  const res = await api.post(`/api/comments/vote/${commentId}`, { value });
  return res.data;
};

export const voteReply = async (
  commentId: string,
  replyId: string,
  value: "up" | "down",
) => {
  const res = await api.post(`/api/comments/vote/${commentId}/${replyId}`, {
    value,
  });
  return res.data;
};
