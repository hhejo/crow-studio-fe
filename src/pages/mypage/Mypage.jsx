//  Router, Redux
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Firebase
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
// Slice
import { logout, setCurrentUser } from "../../redux/user-slice";
// Toast
import { toast } from "react-toastify";
// Sweet Alert
import { swalOptions, MySwal } from "../../sweet-alert";
// Components
import { MypageProfile } from "./MypageProfile";
import { MypageModifyForm } from "./MypageModifyForm";

const Mypage = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { docId, nickname, email, gitUsername } = useSelector(
    (state) => state.user.value
  );

  // 닉네임 변경 핸들러
  const modifyNicknameHandler = async (modifiedNickname) => {
    try {
      await updateProfile(auth.currentUser, { displayName: modifiedNickname }); // 1. firebase authentication에 변경된 닉네임 적용
      const docRef = doc(firestore, "users", docId); // firestore의 users 컬렉션에서 현재 로그인된 유저의 docId에 해당하는 유저 docRef 가져오기
      await updateDoc(docRef, { nickname: modifiedNickname }); // 2. firestore의 users 컬렉션에 로그인된 유저의 변경된 닉네임 적용
      dispatch(setCurrentUser({ ...auth.currentUser, docId })); // 3. Redux에 변경된 닉네임까지 적용된 현재 로그인된 유저 정보 저장
      toast.success("닉네임을 성공적으로 변경했습니다"); // 닉네임 변경 성공 토스트
    } catch (error) {
      console.error(error);
    }
  };

  // 회원 탈퇴 핸들러
  const resignHandler = async () => {
    const title = "정말로 탈퇴하시겠습니까?";
    const result = await MySwal.fire({ ...swalOptions, title });
    if (!result.isConfirmed) return;
    // toast.warning("팀장으로 있는 동안은 탈퇴할 수 없습니다");
    // toast.warning("소속된 팀이 존재하는 동안은 탈퇴할 수 없습니다")
    try {
      await auth.currentUser.delete(); // 1. firebase authentication에서 현재 로그인된 유저 삭제
      const docRef = doc(firestore, "users", docId); // firestore의 users 컬렉션에서 현재 로그인된 유저의 docId에 해당하는 유저 docRef 가져오기
      await deleteDoc(docRef); // 2. firestore의 users 컬렉션에서 현재 로그인된 유저 삭제
      dispatch(logout()); // 3. Redux에 현재 로그인된 유저 정보 삭제
      toast.success("회원 탈퇴를 완료했습니다"); // 회원 탈퇴 성공 토스트
      navigate("/", { replace: true }); // /로 리다이렉트하고 뒤로가기 방지
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      data-aos="fade-in"
      className="flex md:flex-row flex-col h-full justify-center items-center m-3 mb-6 overflow-auto"
    >
      {/* 프로필 */}
      <MypageProfile
        email={email}
        nickname={nickname}
        gitUsername={gitUsername}
      />

      {/* 회원정보수정 */}
      <MypageModifyForm
        modifyNickname={modifyNicknameHandler}
        resign={resignHandler}
      />
    </main>
  );
};

export default Mypage;
