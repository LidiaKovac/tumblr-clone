import { FormEvent } from "react";
import httpClient from "../../api/axiosConfig";
import { Validator } from "../../utils/validator";
import { useAppDispatch } from "../../redux/store";
import { addError } from "../../redux/slices/globalErrorsSlice";
import { fetchPosts } from "../../redux/slices/postSlices";

export const PostCreator = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!Validator.validatePost(new FormData(ev.target as HTMLFormElement))) {
      dispatch(
        addError({
          message: "Validation failed",
          thrownAt: new Date().toString(),
        })
      );
      return 
    }
    await httpClient.post("/post", new FormData(ev.target as HTMLFormElement));
    await dispatch(fetchPosts())
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea name="markDownContent" cols={30} rows={10}></textarea>
      <input type="text" name="tags" />
      <input type="file" name="imageFiles" multiple />
      <button>Submit</button>
    </form>
  );
};
