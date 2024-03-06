import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { setCurrentUser } from "../../redux/user-slice";
import Header from "../../components/Header";
import SignupTitle from "./SignupTitle";
import SignupForm from "./SignupForm";

// Signup
const Signup = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];

  // signupHandler
  const signupHandler = async (signupData) => {
    try {
      const { email, password: pw, nickname } = signupData; // 입력한 email, password, nickname 가져오기
      const { user } = await createUserWithEmailAndPassword(auth, email, pw); // firebase에 email, password를 가진 유저 생성
      await updateProfile(user, { displayName: nickname }); // 닉네임 적용
      const newUserToAdd = {
        uid: user.uid,
        email,
        password: "",
        nickname,
        accessToken: user.accessToken,
        imageURL: "",
        gitUsername: "",
        gitToken: "",
      };
      const collectionRef = collection(firestore, "users"); // firestore의 users 컬렉션
      const docRef = await addDoc(collectionRef, newUserToAdd); // users 컬렉션에 유저 정보 삽입
      dispatch(setCurrentUser({ ...user, docId: docRef.id })); // Redux에 user 정보 저장
      toast.success("회원가입 성공"); // 토스트 출력
      navigate("/teams"); // /teams로 이동
    } catch (error) {
      const { code: errorCode, message: errorMessage } = error; // 회원가입 에러
      if (errorCode === "auth/weak-password")
        toast.warning("비밀번호는 6자 이상이어야 합니다.");
      else if (errorCode === "auth/email-already-in-use")
        toast.warning("이미 사용중인 이메일입니다."); // 409
      else toast.error("회원가입 오류");
      console.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* 헤더 */}
      <Header />
      {/* Section */}
      <section
        data-aos="fade-in"
        className="p-4 w-screen h-full flex flex-wrap justify-center items-center"
      >
        <div className="h-fit flex flex-col">
          {/* 회원가입 제목 */}
          <SignupTitle />
          {/* 회원가입 폼 */}
          <SignupForm signup={signupHandler} />
          {/* 로그인 링크 */}
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
