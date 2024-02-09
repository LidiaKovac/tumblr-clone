import "./Post.scss";
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDots, BsChat } from "react-icons/bs";
import { MdOutlineRepeat } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { AiOutlineFire } from "react-icons/ai";
import { FC } from "react";
export const Post:FC<{post:Post}> = ({post}) => {
  return (
    <div className="post">
      <div className="post__user">
        <div className="post__user-info">
          <img src={post.user.avatar} alt={post.user.blogTitle} /> {post.user.name}
        </div>
        <BsThreeDots />
      </div>
      <div className="post__content">
        {
          post.images?.map(img => {
            return <img src={img} />
          })
        }
      </div>
      <div className="post__description">{post.markDownContent}</div>
      <div className="post__tags">{post.tags}</div>
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
