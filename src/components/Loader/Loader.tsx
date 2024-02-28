import { ProgressBar } from "react-loader-spinner";
import "./Loader.scss"
export const Loader = () => {
  return (
    <div className="loader__wrap">
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#00B8FF"
        borderColor="#00B8FF"
        ariaLabel="progress-bar-loading"
      />
    </div>
  );
};
