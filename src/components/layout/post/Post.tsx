import "./Post.scss";
import { FaShare, FaHeart } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { BsThreeDots, BsFire, BsChatFill } from "react-icons/bs";
export const Post = () => {
  return (
    <div className="post">
      <div className="post__user">
        <div className="post__user-info">
          <img src="assets/SPN_1117.jpg" alt="" /> somethingkevin
        </div>
        <BsThreeDots />
      </div>
      <div className="post__content">
        <img src="assets/post/1.jpg" alt="" />
        <img src="assets/post/2.jpg" alt="" />
      </div>
      <div className="post__description">lidol guy</div>
      <div className="post__tags">#kevin #kevin spn #little meow meow</div>
      <div className="post__actions">
        <BsFire /> Blaze
        <div className="divider"></div>
        <div className="post__actions-activity">
          <div className="notes">
            1365 notes
          </div>
          <div className="actions">
            <div className="share">
              <FaShare />
            </div>
            <div className="comment">
              <BsChatFill />
            </div>
            <div className="reblog">
              <FaRepeat />
            </div>
            <div className="like">
              <FaHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
