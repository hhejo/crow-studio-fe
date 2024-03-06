import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";

const Profile = ({ isMe, mypageUid, currentUid }) => {
  const navigate = useNavigate();
  const {
    email: currentEmail,
    nickname: currentNickname,
    gitUsername: currentGitUsername,
  } = useSelector((state) => state.user.value);
  const [mypageUser, setMypageUser] = useState({});
  const { nickname: mypageNickname, email: mypageEmail } = mypageUser;

  useEffect(() => {
    async function fetchUser() {
      const collectionRef = collection(firestore, "users");
      const q = query(collectionRef, where("uid", "==", mypageUid));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        const { uid, email, nickname } = doc.data();
        fetchedUsers.push({ docId: doc.id, email, nickname, uid });
      });
      if (fetchedUsers[0]) setMypageUser(fetchedUsers[0]);
      else navigate("/404", { replace: true }); // 404
    }
    fetchUser();
  }, [navigate, mypageUid]);

  return (
    <div
      className="md:w-80 sm:w-[600px] w-[400px] flex justify-center items-center border border-primary_-2_dark rounded-md md:mr-2 md:mb-0 sm:mr-0 sm:mb-2 mb-2 py-4"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div className="flex flex-col items-center">
        {/* 프사 기본 */}
        <img
          className="w-36 h-36 mb-6 mx-3 rounded-full cursor-pointer"
          src={require("../../assets/images/elmo.jpg")}
          alt="profile-img"
        />

        {/* 닉네임 */}
        <div className="text-white text-2xl font-bold">
          {isMe ? currentNickname : mypageNickname}
        </div>

        {/* 메일 */}
        <div className="text-sm">{isMe ? currentEmail : mypageEmail}</div>

        {/* 깃 이메일 */}
        <div className="text-primary_-2_dark text-sm mb-6 flex">
          <div className="mr-2">깃 계정:</div>
          {isMe && (currentGitUsername || "깃 이메일 연결되지 않음")}
        </div>

        {/* 정보 수정 버튼 */}
        {/* {isMe && (
          <button className="sm:w-[169px] w-auto h-[36px] p-2 text-sm font-bold text-primary_dark hover:text-black bg-component_item_bg_dark border hover:bg-point_light_yellow border-primary_-2_dark hover:border-white rounded-md">
            내 정보 수정하기
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
