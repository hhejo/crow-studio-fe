import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setCurrentUser } from "../../redux/user-slice";
import Header from "../../components/Header";
import LoginForm from "./LoginForm";
import { TitleWithLogo } from "../../components/TitleWithLogo";

const Login = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const loginHandler = async (loginData) => {
    try {
      const { email, password: pw } = loginData; // 입력한 email, password 가져오기
      const { user } = await signInWithEmailAndPassword(auth, email, pw); // firebase에 email, password가 일치하는 유저 가져옴
      dispatch(setCurrentUser(user)); // Redux에 user 정보 저장
      toast.success("로그인 성공"); // 토스트 출력
      navigate("/teams"); // /temas로 이동
    } catch (error) {
      const { code: errCode, message: errMessage } = error; // 로그인 에러
      if (errCode === "auth/invalid-credential")
        toast.warning("유효하지 않은 이메일이나 비밀번호입니다."); // 409
      else toast.error("로그인 오류");
      console.error(errMessage);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <section
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
      </section>
    </div>
  );
};

export default Login;
