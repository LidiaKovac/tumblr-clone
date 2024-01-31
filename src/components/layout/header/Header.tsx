import {
  IoCamera,
  IoChatbox,
  IoLink,
  IoText,
  IoVideocam,
} from "react-icons/io5";
import { SlEarphones } from "react-icons/sl";
import { HeaderItem } from "./HeaderItem/HeaderItem";
import { IoMdQuote } from "react-icons/io";
import "./Header.scss"
export const Header = () => {
  return (
    <header className="header">
      <HeaderItem color="white" Icon={IoText} text="Text" />
      <HeaderItem color="#FF4930" Icon={IoCamera} text="Photo" />
      <HeaderItem color="#FF8A00" Icon={IoMdQuote} text="Quote" />
      <HeaderItem color="#00CF35" Icon={IoLink} text="Link" />
      <HeaderItem color="#00B8FF" Icon={IoChatbox} text="Chat" />
      <HeaderItem color="#7C5CFF" Icon={SlEarphones} text="Audio" />
      <HeaderItem color="#FF62CE" Icon={IoVideocam} text="Video" />
    </header>
  );
};
