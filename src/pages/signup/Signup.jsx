// Router, Redux
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
// Slice
import { setCurrentUser } from "../../redux/user-slice";
import { startLoading, stopLoading } from "../../redux/global-slice";
// Toast
import { alertToast, toastType } from "../../toast";
// Components
import { SignupForm } from "./SignupForm";
import { TitleWithLogo } from "../../components/TitleWithLogo";

const Signup = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];

  // 회원가입 핸들러
  const signupHandler = async (signupData) => {
    const { email, nickname, password: pw } = signupData; // 회원가입 폼에 입력한 email, password, nickname
    dispatch(startLoading()); // 로딩 화면 시작
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pw); // 1. firebase authentication에 회원가입 유저 생성하고 해당 유저 정보 받기
      await updateProfile(user, { displayName: nickname }); // 2. firebase authentication에 회원가입 시 입력된 닉네임도 적용
      const basic = { uid: user.uid, email, nickname, password: "" }; // 기본 유저 정보
      const extra = { imageURL: "", gitUsername: "", gitToken: "", teams: [] }; // 추가 유저 정보
      const userToAdd = { ...basic, ...extra }; // firestore의 users 컬렉션에 추가할 회원가입된 유저
      const docRef = await addDoc(collection(firestore, "users"), userToAdd); // 3. firestore의 users 컬렉션에 회원가입 유저 추가하고 해당 document 받기
      const currentUser = { ...user, docId: docRef.id }; // Redux에 저장할 회원가입 유저 정보
      dispatch(setCurrentUser(currentUser)); // 4. Redux에 회원가입한 유저 정보 저장. 현재 로그인한 유저가 됨
      alertToast(toastType.success, "회원가입 성공");
      navigate("/teams", { replace: true });
    } catch (error) {
      const { code, message } = error; // 회원가입 에러
      if (code === "auth/email-already-in-use")
        alertToast(toastType.warning, "이미 사용중인 이메일");
      else alertToast(toastType.error, "회원가입 오류"); // 기타 에러
      console.error(message);
    } finally {
      dispatch(stopLoading()); // 로딩 화면 종료
    }
  };

  return (
    <main
      data-aos="fade-in"
      className="p-4 w-screen h-full flex flex-wrap justify-center items-center"
    >
      <div className="h-fit flex flex-col">
        {/* 까마귀공방 로고, 회원가입 타이틀 */}
        <TitleWithLogo title="회원가입" />

        {/* 회원가입 폼 */}
        <SignupForm signup={signupHandler} />

        {/* 로그인하기 버튼 */}
        <Link
          className="block w-full text-center hover:text-white transition"
          to="/login"
        >
          계정이 있으신가요? 로그인하기
        </Link>
      </div>
    </main>
  );
};

export default Signup;
