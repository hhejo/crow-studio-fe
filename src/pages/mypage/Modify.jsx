import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { logout, updateGitAuth, setCurrentUser } from "../../redux/user-slice";
import NicknameForm from "./components/NicknameForm";
import PasswordForm from "./components/PasswordForm";
import ResignForm from "./components/ResignForm";
import GitForm from "./components/GitForm";

const Modify = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { docId } = useSelector((state) => state.user.value);
  const MySwal = withReactContent(Swal);

  // 닉네임 업데이트 핸들러
  const updateNicknameHandler = async (updatedNickname) => {
    await updateProfile(auth.currentUser, { displayName: updatedNickname });
    const docRef = doc(firestore, "users", docId);
    await updateDoc(docRef, { nickname: updatedNickname });
    dispatch(setCurrentUser({ ...auth.currentUser, docId }));
    toast.success("닉네임을 성공적으로 변경했습니다");
  };

  // 비밀번호 변경 핸들러
  // const submitPasswordHandler = (passwordData) => {
  //   userApi
  //     .updatePassword(passwordData)
  //     .then(toast.success("비밀번호를 성공적으로 변경했습니다"))
  //     .catch((errorStatusCode) => {
  //       console.log(errorStatusCode);
  //       if (errorStatusCode.response.status === 409) {
  //         toast.warning("현재 비밀번호가 틀립니다");
  //       } else {
  //         toast.error("Error");
  //       }
  //     });
  // };

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
    // 팀장이면 탈퇴 금지 403
    // toast.warning("팀장으로 있는 동안은 탈퇴할 수 없습니다");
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

  // const updateGitAuthHandler = (credentialsData) => {
  //   dispatch(updateGitAuth(credentialsData))
  //     .unwrap()
  //     .then(() => toast.success("깃 연결 성공"))
  //     .catch(console.error);
  // };

  return (
    <div
      className="lg:w-[700px] md:w-[400px] sm:w-[600px] w-[400px] p-8 flex flex-col border border-primary_-2_dark rounded-md overflow-auto"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div className="flex mb-5 justify-between items-center">
        <div className="text-white text-xl font-bold">회원정보 수정</div>
      </div>
      <NicknameForm updateNickname={updateNicknameHandler} />
      <hr className="border-primary_-2_dark mb-5" />
      {/* <PasswordForm updatePassword={submitPasswordHandler} /> */}
      <PasswordForm />
      <hr className="border-primary_-2_dark mb-5" />
      <GitForm
      // initialGitUsername={myGitUsername}
      // updateGitAuth={updateGitAuthHandler}
      />
      <ResignForm resign={resignHandler} />
    </div>
  );
};

export default Modify;
