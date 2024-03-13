import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setCurrentUser } from "../../redux/user-slice";
import LoginForm from "./LoginForm";
import { TitleWithLogo } from "../../components/TitleWithLogo";

const Login = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];

  const loginHandler = async (loginData) => {
    // 입력한 email, password 가져오기
    const { email, password: pw } = loginData;
    try {
      // firebase에서 email, password가 일치하는 유저 가져오기
      const { user } = await signInWithEmailAndPassword(auth, email, pw);
      // Redux에 user 정보 저장
      dispatch(setCurrentUser(user)); // docId는 없지만 어차피 App.js에서 작업
      //
      toast.success("로그인 성공");
      navigate("/teams");
    } catch (error) {
      // 로그인 에러
      const { code: errCode, message: errMessage } = error;
      // 409
      if (errCode === "auth/invalid-credential")
        toast.warning("유효하지 않은 이메일이나 비밀번호입니다.");
      //
      else toast.error("로그인 오류");
      console.error(errMessage);
    }
  };

  return (
    <main
      data-aos="fade-in"
      className="p-4 w-screen h-full flex flex-wrap justify-center items-center"
    >
      <div className="h-fit flex flex-col">
        <TitleWithLogo title="로그인" />
        <LoginForm login={loginHandler} />
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
