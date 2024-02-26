import { IoMdClose } from "react-icons/io";
import "./BlogSuggestion.scss";
import { followById } from "../../api";
import { useRef } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchPosts } from "../../redux/slices/postSlices";
export const BlogSuggestion = ({
  user,
  isSuggestion,
}: {
  user: User;
  isSuggestion: boolean;
}) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const handleFollow = async () => {
    const isFullfilled = await followById(user.id);
    if (isFullfilled) {
      selfRef.current!.remove();
      dispatch(fetchPosts());
    }
  };
  return (
    <div className="blog-suggestion" ref={selfRef}>
      <img src={user.avatar} />
      <div className="blog-suggestion__data">
        <div className="blog-suggestion__data-name">{user.blogTitle}</div>
        <div className="blog-suggestion__data-blog-name">{user.name}</div>
      </div>
      {isSuggestion && (
        <>
          <button className="blog-suggestion__follow" onClick={handleFollow}>
            Follow
          </button>
          <button className="blog-suggestion__dismiss">
            <IoMdClose />
          </button>
        </>
      )}
    </div>
  );
};
