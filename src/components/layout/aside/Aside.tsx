import { FC, ReactElement } from "react";
import "./Aside.scss"
interface IProps {
  children: ReactElement[] | ReactElement;
}
export const Aside: FC<IProps> = ({ children }) => {
  return <aside>{children}</aside>;
};
