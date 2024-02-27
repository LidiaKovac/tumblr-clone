import { FC } from "react";
import { IconType } from "react-icons";

interface IProps {
    Icon: IconType;
    text: string;
    color: string
    onClick?: () => void
  }
export const HeaderItem:FC<IProps> = ({Icon, text, color, onClick}) => {
    return <div className="header__item" onClick={onClick}>
        <Icon  style={{color}}/>
        {text}
    </div>
}