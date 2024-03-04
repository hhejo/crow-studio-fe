import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../components/Header";
import Profile from "./Profile";
import Modify from "./Modify";

const Mypage = () => {
  const { userSeq } = useParams();
  const mySeq = useSelector((state) => state.user.value.mySeq);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    setIsMe(+userSeq === mySeq);
  }, [mySeq, userSeq, isMe]);

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <section
        data-aos="fade-in"
        className="flex md:flex-row flex-col h-full justify-center items-center m-3 mb-6 overflow-auto"
      >
        {/* 프로필 */}
        <Profile isMe={isMe} userSeq={userSeq} mySeq={mySeq} />
        {/* 회원정보수정 */}
        {isMe && <Modify />}
      </section>
    </div>
  );
};

export default Mypage;
