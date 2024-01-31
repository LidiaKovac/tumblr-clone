import "./Post.scss";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDots, BsChat } from "react-icons/bs";
import { MdOutlineRepeat } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { AiOutlineFire } from "react-icons/ai";
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
        <AiOutlineFire /> Blaze
        <div className="divider"></div>
        <div className="post__actions-activity">
          <div className="notes">1365 notes</div>
          <div className="actions">
            <div className="share">
              <PiShareFat />
            </div>
            <div className="comment">
              <BsChat />
            </div>
            <div className="reblog">
              <MdOutlineRepeat />
            </div>
            <div className="like">
              <FaRegHeart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
