import "./Post.scss";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { BsThreeDots, BsChat } from "react-icons/bs";
import { MdOutlineRepeat } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { AiOutlineFire } from "react-icons/ai";
import { FC, FormEvent } from "react";
import { likeByPostId } from "../../../api";
import { useAppDispatch } from "../../../redux/store";
import { fetchPosts } from "../../../redux/slices/postSlices";
import { useNotes } from "../../../hooks/useNotes";
import { useComments } from "../../../hooks/useComments";
import httpClient from "../../../api/axiosConfig";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
export const Post: FC<{ post: Post }> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { notes, openNotes, isOpen } = useNotes();
  const { comments, openComments, isCommentOpen, addComment } = useComments();
  const handleLike = async () => {
    await likeByPostId(post.reblog ? post.originalPost!.id : post.id);
    await dispatch(fetchPosts());
  };
  const handleComment = async (ev: FormEvent) => {
    ev.preventDefault();
    await addComment(
      post.reblog ? post.originalPost! : post,
      new FormData(ev.target as HTMLFormElement)
    );
    await dispatch(fetchPosts());
  };

  const handleReblog = async () => {
    const fd = new FormData();
    fd.append("markDownContent", "This is an hardcoded reblog!");
    fd.append("tags", "kevin, that dude kevin");
    if (!post.reblog) {
      await httpClient.post("/post/" + post.id + "/reblog", fd);
    } else {
      await httpClient.post("/post/" + post.originalPost!.id + "/reblog", fd);
    }
    await dispatch(fetchPosts());
  };
  return (
    <div className="post">
      <div className="post__user">
        <div className="post__user-info">
          <img src={post.user.avatar} alt={post.user.blogTitle} />{" "}
          {post.user.name}{" "}
          {post.reblog && (
            <div>
              <span> reblogged </span>
              <span> {post.originalPost?.user.name}</span>
            </div>
          )}
        </div>
        <BsThreeDots />
      </div>
      {post.reblog ? (
        <>
          <div className="post__user">
            <div className="post__user-info">
              <img
                src={post.originalPost?.user.avatar}
                alt={post.originalPost?.user.blogTitle}
              />{" "}
              {post.originalPost?.user.name}{" "}
            </div>
            <BsThreeDots />
          </div>
          <div className="post__content">
            <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {post.originalPost!.markDownContent}
            </Markdown>
            {/* {post.originalPost?.images?.map((img) => {
              return <img src={img} />;
            })} */}
          </div>
          {/* <div className="post__description">
            {post.originalPost?.markDownContent}
            {post.markDownContent.length > 0 && (
              <>
                <hr />
                {post.markDownContent}
              </>
            )}
          </div> */}
          <div className="post__tags">
            {post.tags.map((tag) => (
              <span> {"#" + tag} </span>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="post__content">
            <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {post.markDownContent}
            </Markdown>
          </div>
          {/* <div className="post__description">{post.markDownContent}</div> */}
          <div className="post__tags">
            {post.tags.map((tag) => (
              <span> {"#" + tag} </span>
            ))}
          </div>{" "}
        </>
      )}

      <div className="post__actions">
        <AiOutlineFire /> Blaze
        <div className="divider"></div>
        <div className="post__actions-activity">
          <div
            className="notes"
            onClick={() =>
              openNotes(post.reblog ? post.originalPost!.id : post.id)
            }
          >
            {post.reblog ? post.originalPost?.notes : post.notes} notes
          </div>
          {isOpen && (
            <div>
              Comments:{" "}
              {notes?.comments.map((n) => n.user.name + " " + n.content)}
            </div>
          )}
          {isOpen && <div>Likes: {notes?.likes.map((n) => n.user.name)}</div>}
          {isOpen && <div>Rb: {notes?.reblogs.map((n) => n.user.name)}</div>}
          <div className="actions">
            <div className="share">
              <PiShareFat />
            </div>
            <div
              className="comment"
              onClick={() =>
                openComments(post.reblog ? post.originalPost!.id : post.id)
              }
            >
              <BsChat />
              {isCommentOpen && (
                <div>
                  <form onSubmit={handleComment}>
                    <textarea name="content"></textarea>
                    <button>Comment</button>
                  </form>
                  {comments.map((c) => c.content)}
                </div>
              )}
            </div>
            <div className="reblog" onClick={handleReblog}>
              <MdOutlineRepeat />
            </div>
            <div className="like" onClick={handleLike}>
              {post.reblog &&
                (post.originalPost?.likedByUser ? (
                  <IoHeartSharp />
                ) : (
                  <IoHeartOutline />
                ))}
              {!post.reblog &&
                (post.likedByUser ? <IoHeartSharp /> : <IoHeartOutline />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
