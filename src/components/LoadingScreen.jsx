import Lottie from "react-lottie";
import * as animationData from "../assets/json/monument_crow.json";

export const LoadingScreen = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div className="absolute w-screen h-screen flex flex-col justify-center items-center bg-component_item_bg_+2_dark z-10">
      <div className="ml-6">
        <Lottie options={defaultOptions} height={200} width={400} />
      </div>
      <div className="text-[37px] text-point_purple font-bold">까마귀공방</div>
      <div className="text-xl text-white font-medium">잠시만 기다려주세요</div>
    </div>
  );
};
