import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { setCurrentUser } from "../../redux/user-slice";
import Header from "../../components/Header";
import SignupForm from "./SignupForm";
import { TitleWithLogo } from "../../components/TitleWithLogo";

const Signup = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const signupHandler = async (signupData) => {
    const { email, password: pw, nickname } = signupData; // 입력한 email, password, nickname 가져오기
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pw); // firebase에 email, password를 가진 유저 생성
      await updateProfile(user, { displayName: nickname }); // 닉네임 적용
      const newUserToAdd = {
        uid: user.uid,
        email,
        password: "",
        nickname,
        imageURL: "",
        gitUsername: "",
        gitToken: "",
        teams: [],
      };
      const docRef = await addDoc(collection(firestore, "users"), newUserToAdd); // users 컬렉션에 유저 정보 삽입
      dispatch(setCurrentUser({ ...user, docId: docRef.id })); // Redux에 user 정보 저장
      toast.success("회원가입 성공");
      navigate("/teams");
    } catch (error) {
      const { code: errCode, message: errMessage } = error; // 회원가입 에러
      if (errCode === "auth/weak-password")
        toast.warning("비밀번호는 6자 이상이어야 합니다.");
      else if (errCode === "auth/email-already-in-use")
        toast.warning("이미 사용중인 이메일입니다."); // 409
      else toast.error("회원가입 오류");
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
          <TitleWithLogo title="회원가입" />
          <SignupForm signup={signupHandler} />
          <Link
            to="/login"
            className="block w-full text-center hover:text-white transition"
          >
            계정이 있으신가요? 로그인하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;
