import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { logout, updateGitAuth, setCurrentUser } from "../../redux/user-slice";
import Profile from "./Profile";
import ModifyForms from "./ModifyForms";

const Mypage = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { uid: mypageUid } = useParams();
  const { uid: currentUid, docId } = useSelector((state) => state.user.value);
  const [isMe, setIsMe] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setIsMe(mypageUid === currentUid);
  }, [currentUid, mypageUid]);

  // 닉네임 수정 핸들러
  const modifyNicknameHandler = async (modifiedNickname) => {
    await updateProfile(auth.currentUser, { displayName: modifiedNickname });
    const docRef = doc(firestore, "users", docId);
    await updateDoc(docRef, { nickname: modifiedNickname });
    dispatch(setCurrentUser({ ...auth.currentUser, docId }));
    toast.success("닉네임을 성공적으로 변경했습니다");
  };

  // 회원 탈퇴 핸들러
  const resignHandler = async () => {
    const reply = await MySwal.fire({
      title: "정말로 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      background: "#3C3C3C",
    });
    if (!reply.isConfirmed) return;
    // // // 팀장이면 탈퇴 금지 403
    // // toast.warning("팀장으로 있는 동안은 탈퇴할 수 없습니다");
    try {
      await auth.currentUser.delete();
      const docRef = doc(firestore, "users", docId);
      await deleteDoc(docRef);
      toast.success("회원 탈퇴를 완료했습니다");
      dispatch(logout());
      navigate("/");
    } catch (e) {
      console.error("e:", e);
    }
  };

  return (
    <main
      data-aos="fade-in"
      className="flex md:flex-row flex-col h-full justify-center items-center m-3 mb-6 overflow-auto"
    >
      {/* 프로필 */}
      <Profile isMe={isMe} mypageUid={mypageUid} currentUid={currentUid} />
      {/* 회원정보수정 */}
      {isMe && (
        <ModifyForms
          modifyNickname={modifyNicknameHandler}
          resign={resignHandler}
        />
      )}
    </main>
  );
};

export default Mypage;
