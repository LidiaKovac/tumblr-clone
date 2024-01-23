import { BiCompass, BiSolidHomeHeart } from "react-icons/bi";
import "./Dashboard.scss";
import { Aside } from "../../components/layout/aside/Aside";
import { AsideItem } from "../../components/layout/aside/AsideItem/AsideItem";
import { Header } from "../../components/layout/header/Header";
import { Post } from "../../components/layout/post/Post";
export const Dashboard = () => {
  return (
    <>
      <div className="dash__container">
        <Aside>
          <AsideItem Icon={BiSolidHomeHeart} text="Home" notifications={41} />
          <AsideItem Icon={BiCompass} text="Explore" notifications={null} />
        </Aside>
        <main>
          <Header />
          <div className="divider">
            <div className="line"></div>
            See new posts
            <div className="line"></div>
          </div>
          <Post/>
        </main>
        <Aside>
          <input type="text" name="" id="" />
        </Aside>
      </div>
    </>
  );
};
