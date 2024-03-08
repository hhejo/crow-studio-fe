import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { setCurrentUser } from "../../redux/user-slice";
import SignupForm from "./SignupForm";
import { TitleWithLogo } from "../../components/TitleWithLogo";
import { Nav } from "../../components/Nav";

const Signup = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];

  const signupHandler = async (signupData) => {
    // 입력한 email, password, nickname 가져오기
    const { email, password: pw, nickname } = signupData;
    try {
      // firebase에 회원가입 유저 생성
      const { user } = await createUserWithEmailAndPassword(auth, email, pw);
      // 닉네임도 적용
      await updateProfile(user, { displayName: nickname });
      // 회원가입 유저
      const basic = { uid: user.uid, email, nickname, password: "" };
      const extra = { imageURL: "", gitUsername: "", gitToken: "", teams: [] };
      const userToAdd = { ...basic, ...extra };
      // users 컬렉션에 회원가입 유저 추가
      const docRef = await addDoc(collection(firestore, "users"), userToAdd);
      // Redux에 회원가입한 유저 정보 저장. 현재 로그인한 유저가 됨
      const currentUser = { ...user, docId: docRef.id };
      dispatch(setCurrentUser(currentUser));
      //
      toast.success("회원가입 성공");
      navigate("/teams");
    } catch (error) {
      // 회원가입 에러
      const { code: errCode, message: errMessage } = error;
      //
      if (errCode === "auth/weak-password")
        toast.warning("비밀번호는 6자 이상이어야 합니다.");
      // 409
      else if (errCode === "auth/email-already-in-use")
        toast.warning("이미 사용중인 이메일입니다.");
      //
      else toast.error("회원가입 오류");
      console.error(errMessage);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Nav />
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
