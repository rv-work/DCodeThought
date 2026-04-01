import api from "./axios";
import type { FeedResponse, FeedPostType, FeedComment } from "@/types/feed";

export const getFeedPosts = async (
  page: number = 1,
  limit: number = 10,
): Promise<FeedResponse> => {
  const res = await api.get(`/api/feed?page=${page}&limit=${limit}`);
  return res.data;
};

// We use FormData because we are uploading files (images)
export const createFeedPost = async (
  formData: FormData,
): Promise<{ success: boolean; post: FeedPostType; message: string }> => {
  const res = await api.post("/api/feed", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const togglePostLike = async (
  postId: string,
): Promise<{ success: boolean; isLiked: boolean; likesCount: number }> => {
  const res = await api.put(`/api/feed/${postId}/like`);
  return res.data;
};

export const addPostComment = async (
  postId: string,
  text: string,
): Promise<{ success: boolean; comments: FeedComment[] }> => {
  const res = await api.post(`/api/feed/${postId}/comment`, { text });
  return res.data;
};

export const deletePostComment = async (
  postId: string,
  commentId: string,
): Promise<{ success: boolean }> => {
  const res = await api.delete(`/api/feed/${postId}/comment/${commentId}`);
  return res.data;
};

// 👇 NAYE API FUNCTIONS 👇

export const deleteFeedPost = async (
  postId: string,
): Promise<{ success: boolean }> => {
  const res = await api.delete(`/api/feed/${postId}`);
  return res.data;
};

export const editFeedPost = async (
  postId: string,
  data: { title: string; leetcodeLink: string; content: string; tags: string },
): Promise<{ success: boolean; post: FeedPostType; message: string }> => {
  const res = await api.put(`/api/feed/${postId}`, data);
  return res.data;
};
