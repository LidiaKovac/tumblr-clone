import { useState } from "react";
import httpClient from "../api/axiosConfig";
import { useAppDispatch } from "../redux/store";
import { addError } from "../redux/slices/globalErrorsSlice";

export const useComments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isCommentOpen, setCommentOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const openComments = async (postId: string) => {
    const res = await httpClient.get("/post/comments/" + postId);
    if (res.data.message) {
      dispatch(addError(res.data));
    } else {
      setComments(res.data);
      setCommentOpen(true);
    }
  };
  const addComment = async(post: Post, fd:FormData) => {
    await httpClient.post("/post/comments/" + post.id, fd)
    await openComments(post.id)
  }
  return { comments, openComments, isCommentOpen, setCommentOpen, addComment };
};
