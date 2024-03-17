import Lottie from "react-lottie";
import * as animationData from "../assets/json/monument_crow.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

export const LoadingMini = () => {
  return (
    <div
      data-aos="fade-in"
      className="w-full h-full flex flex-col justify-center items-center bg-component_item_bg_+2_dark mini-loading"
    >
      <div className="ml-6 overflow-hidden">
        <Lottie options={defaultOptions} height={110} width={270} />
      </div>
      <div className="text-[26px] text-point_purple font-bold md:mb-2 mb-1">
        까마귀공방
      </div>
      <div className="text-md text-white font-medium">잠시만 기다려주세요</div>
    </div>
  );
};
