import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Profile from "./Profile";
import Modify from "./Modify";

const Mypage = () => {
  const { uid: mypageUid } = useParams();
  const { uid: currentUid } = useSelector((state) => state.user.value);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    setIsMe(mypageUid === currentUid);
    console.log("mypageUid:", mypageUid);
    console.log("currentUid:", currentUid);
  }, [currentUid, mypageUid]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* 헤더 */}
      <Header />
      <section
        data-aos="fade-in"
        className="flex md:flex-row flex-col h-full justify-center items-center m-3 mb-6 overflow-auto"
      >
        {/* 프로필 */}
        <Profile isMe={isMe} mypageUid={mypageUid} currentUid={currentUid} />
        {/* 회원정보수정 */}
        {isMe && <Modify />}
      </section>
    </div>
  );
};

export default Mypage;
