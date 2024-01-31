import { FC } from "react";
import { IconType } from "react-icons";

interface IProps {
    Icon: IconType;
    text: string;
    color: string
  }
export const HeaderItem:FC<IProps> = ({Icon, text, color}) => {
    return <div className="header__item">
        <Icon  style={{color}}/>
        {text}
    </div>
}