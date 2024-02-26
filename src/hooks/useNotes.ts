import { useState } from "react";
import httpClient from "../api/axiosConfig";
import { useAppDispatch } from "../redux/store";
import { addError } from "../redux/slices/globalErrorsSlice";

export const useNotes = () => {
  const [notes, setNotes] = useState<Notes>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const openNotes = async (postId: string) => {
    const res = await httpClient.get("/post/notes/" + postId);
    if (res.data.message) {
      dispatch(addError(res.data));
    } else {
      setNotes(res.data);
      setOpen(true);
    }
  };
  return { notes, openNotes, isOpen, setOpen };
};
