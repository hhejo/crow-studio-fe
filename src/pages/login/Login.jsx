// Router, Redux
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
// Slice
import { setCurrentUser } from "../../redux/user-slice";
import { startLoading, stopLoading } from "../../redux/global-slice";
// Toast
import { alertToast, toastType } from "../../toast";
// Components
import { LoginForm } from "./LoginForm";
import { TitleWithLogo } from "../../components/TitleWithLogo";

const Login = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];

  // 로그인 핸들러
  const loginHandler = async (loginData) => {
    const { email, password: pw } = loginData; // 로그인 폼에 입력한 email, password
    dispatch(startLoading()); // 로딩 화면 시작
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pw); // 1. firebase authentication에서 email, password가 일치하는 유저 정보 가져오기
      dispatch(setCurrentUser(user)); // 2. Redux에 로그인 유저 정보 저장. 현재 로그인한 유저가 됨. docId는 없지만 어차피 App.js에서 작업
      alertToast(toastType.success, "로그인 성공");
      navigate("/teams", { replace: true }); // /teams로 리다이렉트하고 뒤로가기 방지
    } catch (error) {
      const { code, message } = error; // 로그인 에러
      if (code === "auth/invalid-credential")
        alertToast(toastType.warning, "유효하지 않은 이메일이나 비밀번호");
      else alertToast(toastType.error, "로그인 오류");
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
        {/* 까마귀공방 로고, 로그인 타이틀 */}
        <TitleWithLogo title="로그인" />

        {/* 로그인 폼 */}
        <LoginForm login={loginHandler} />

        {/* 회원가입하기 버튼 */}
        <Link
          to="/signup"
          className="block w-full text-center hover:text-white transition"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
};

export default Login;
