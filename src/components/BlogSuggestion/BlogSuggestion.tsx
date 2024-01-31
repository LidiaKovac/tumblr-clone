import { IoMdClose } from "react-icons/io";
import "./BlogSuggestion.scss"
export const BlogSuggestion = () => {
  return (
    <div className="blog-suggestion">
      <img src="http://placehold.it/100x100" />
      <div className="blog-suggestion__data">
        <div className="blog-suggestion__data-name">randomdean</div>
        <div className="blog-suggestion__data-blog-name">dean quote</div>
      </div>
      <button className="blog-suggestion__follow">Follow</button>
      <button className="blog-suggestion__dismiss">
        <IoMdClose />
      </button>
    </div>
  );
};
