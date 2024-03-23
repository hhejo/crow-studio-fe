//  Router, Redux
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Firebase
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
// Slice
import { logout, setCurrentUser } from "../../redux/user-slice";
import { startLoading, stopLoading } from "../../redux/global-slice";
// Toast
import { alertToast, toastType } from "../../toast";
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
    dispatch(startLoading()); // 로딩 화면 시작
    try {
      await updateProfile(auth.currentUser, { displayName: modifiedNickname }); // 1. firebase authentication에 변경된 닉네임 적용
      const docRef = doc(firestore, "users", docId); // firestore의 users 컬렉션에서 현재 로그인된 유저의 docId에 해당하는 유저 docRef
      await updateDoc(docRef, { nickname: modifiedNickname }); // 2. firestore의 users 컬렉션에 로그인된 유저의 변경된 닉네임 적용
      dispatch(setCurrentUser({ ...auth.currentUser, docId })); // 3. Redux에 변경된 닉네임까지 적용된 현재 로그인된 유저 정보 저장
      alertToast(toastType.success, "닉네임 변경 성공");
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading()); // 로딩 화면 종료
    }
  };

  // 회원 탈퇴 핸들러
  const resignHandler = async () => {
    const title = "정말로 탈퇴하시겠습니까?";
    const result = await MySwal.fire({ ...swalOptions, title });
    if (!result.isConfirmed) return;
    dispatch(startLoading()); // 로딩 화면 시작
    try {
      const docRef = doc(firestore, "users", docId); // firestore의 users 컬렉션에서 현재 로그인된 유저의 docId에 해당하는 유저 docRef
      const documentSnapshot = await getDoc(docRef); // 1. docRef의 documentSnapshot 가져오기
      const { teams } = documentSnapshot.data(); // 해당 유저가 소속된 팀 목록 teams
      if (teams.length > 0) {
        alertToast(toastType.warning, "소속된 팀이 있어 탈퇴 불가"); // 2. 본인이 팀장이거나 팀원으로 소속된 팀이 있으면 탈퇴 불가
        return;
      }
      await deleteDoc(docRef); // 3. firestore의 users 컬렉션에서 현재 로그인된 유저 삭제
      await auth.currentUser.delete(); // 4. firebase authentication에서 현재 로그인된 유저 삭제
      dispatch(logout()); // 5. Redux에 현재 로그인된 유저 정보 삭제
      alertToast(toastType.success, "회원 탈퇴 완료");
      navigate("/", { replace: true }); // /로 리다이렉트하고 뒤로가기 방지
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading()); // 로딩 화면 종료
    }
  };

  // 비밀번호 변경 핸들러
  const modifyPasswordHandler = () => {
    alertToast(toastType.warning, "현재 지원하지 않는 기능");
  };

  // 깃 아이디, 토큰 변경 핸들러
  const modifyGitHandler = () => {
    alertToast(toastType.warning, "현재 지원하지 않는 기능");
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
        modifyPassword={modifyPasswordHandler}
        modifyGit={modifyGitHandler}
      />
    </main>
  );
};

export default Mypage;
