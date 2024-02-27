import { FC } from "react";
import { IconType } from "react-icons";

interface IProps {
  Icon: IconType;
  text: string;
  notifications: number | null;
}
export const AsideItem: FC<IProps> = ({ Icon, text, notifications }) => {
  return (
    <div className="aside__item">
      <div className="aside__item-signature">
        <Icon /> <span> {text} </span>
      </div>
      {notifications && <div className="badge">{notifications}</div>}
    </div>
  );
};
