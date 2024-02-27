import { BiCompass, BiSolidHomeHeart } from "react-icons/bi";
import "./Dashboard.scss";
import { Aside } from "../../components/layout/aside/Aside";
import { AsideItem } from "../../components/layout/aside/AsideItem/AsideItem";
import { Header } from "../../components/layout/header/Header";
import { Post } from "../../components/layout/post/Post";
import { HiLightningBolt } from "react-icons/hi";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoIosMail, IoMdSettings } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BlogSuggestion } from "../../components/BlogSuggestion/BlogSuggestion";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchPosts } from "../../redux/slices/postSlices";
import { useNavigate } from "react-router-dom";
import { fetchMe, fetchUsers } from "../../redux/slices/userSlice";
import { PostCreator } from "../../components/PostCreator/PostCreator";
import { setIsOpen } from "../../redux/slices/postCreatorSlice";
export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.data);
  const users = useAppSelector((state) => state.users.data);
  const me = useAppSelector((state) => state.users.me);
  const errors = useAppSelector((state) => state.errors.data);
  const isOpen = useAppSelector((state) => state.postCreator.isOpen)
  const navigate = useNavigate();
  const handleSetIsOpen = (val:boolean) => {
    dispatch(setIsOpen(val))
  }
  useEffect(() => {
    if (
      localStorage.getItem("tumblr-token") ||
      !errors.some((err) => err.message.toLowerCase().includes("token"))
    ) {
      dispatch(fetchPosts());
      dispatch(fetchUsers());
      dispatch(fetchMe());
    } else navigate("/login");
  }, []);
  return (
    <>
      <div className="dash__container">
        <Aside>
          <>
            <img src="assets/logo-white.png" className="logo" alt="" />
            <AsideItem Icon={BiSolidHomeHeart} text="Home" notifications={41} />
            <AsideItem Icon={BiCompass} text="Explore" notifications={null} />
            <AsideItem
              Icon={HiLightningBolt}
              text="Activity"
              notifications={3}
            />
            <AsideItem
              Icon={TbMessageCircle2Filled}
              text="Messages"
              notifications={null}
            />
            <AsideItem Icon={IoIosMail} text="Inbox" notifications={null} />
            <AsideItem
              Icon={IoPersonSharp}
              text="Account"
              notifications={null}
            />
            <AsideItem
              Icon={IoMdSettings}
              text="Settings"
              notifications={null}
            />
            {me && <BlogSuggestion isSuggestion={false} user={me} />}
            <h3
              onClick={() => {
                localStorage.removeItem("tumblr-token");
                navigate("/login");
              }}
            >
              Logout
            </h3>
          </>
        </Aside>
        <main>
          <Header />
          <PostCreator isOpen={isOpen} setIsOpen={handleSetIsOpen} />
          <div className="divider">
            <div className="line"></div>
            See new posts
            <div className="line"></div>
          </div>
          <div className="main__posts">
            {posts.map((post) => {
              return <Post post={post} />;
            })}
          </div>
        </main>
        <Aside>
          <>
            <div className="search-input__wrap">
              <FaSearch />
              <input type="text" placeholder="Search on Tumblr" />
            </div>
            <h3>Check out these blogs</h3>
            {users.slice(0, 4).map((user) => {
              return (
                <BlogSuggestion key={user.id} user={user} isSuggestion={true} />
              );
            })}
          </>
        </Aside>
      </div>
    </>
  );
};
