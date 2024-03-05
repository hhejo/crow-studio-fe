import { useState } from "react";
import EmailForm from "../../components/forms/EmailForm";
import NicknameForm from "../../components/forms/NicknameForm";
import PasswordForm from "../../components/forms/PasswordForm";
import SubmitButton from "../../components/SubmitButton";

// 초기 입력 상태
const initialInputState = {
  email: "",
  nickname: "",
  password1: "",
  password2: "",
};

// 초기 에러 메시지 상태
const initialErrState = {
  emailErrMsg: "",
  nicknameErrMsg: "",
  password1ErrMsg: "",
  password2ErrMsg: "",
};

// 이메일 정규표현식
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

// SignupForm
const SignupForm = ({ signupHandler }) => {
  const [inputs, setInputs] = useState(initialInputState); // 초기 입력
  const [errMsgs, setErrMsgs] = useState(initialErrState); // 초기 에러메시지
  const { email, nickname, password1, password2 } = inputs; // 이메일, 비밀번호 상태 할당
  const { emailErrMsg, nicknameErrMsg, password1ErrMsg, password2ErrMsg } =
    errMsgs; // 에러메시지 상태 할당

  // inputChangeHandler
  const inputChangeHandler = (e) => {
    const { name: eName, value: eValue } = e.target;
    if (eName === "email") {
      setInputs((prev) => {
        return { ...prev, email: eValue };
      });
    } else if (eName === "nickname") {
      setInputs((prev) => {
        return { ...prev, nickname: eValue };
      });
    } else if (eName === "password1") {
      setInputs((prev) => {
        return { ...prev, password1: eValue };
      });
    } else if (eName === "password2") {
      setInputs((prev) => {
        return { ...prev, password2: eValue };
      });
    }
  };

  // submitSignupHandler
  const submitSignupHandler = (e) => {
    e.preventDefault();
    setErrMsgs(initialErrState);
    let isValid = true;
    // 이메일
    if (email.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, emailErrMsg: "이메일을 입력하세요" };
      });
      isValid = false;
    } else if (!emailRegEx.test(email)) {
      setErrMsgs((prev) => {
        return { ...prev, emailErrMsg: "이메일 형식이 올바르지 않습니다" };
      });
      isValid = false;
    }
    // 닉네임
    if (nickname.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, nicknameErrMsg: "닉네임을 입력하세요" };
      });
      isValid = false;
    }
    // 비밀번호 1
    if (password1.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, password1ErrMsg: "비밀번호를 입력하세요" };
      });
      isValid = false;
    }
    //비밀번호 2
    if (password2.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, password2ErrMsg: "비밀번호를 한번 더 입력하세요" };
      });
      isValid = false;
    }
    // 비밀번호 불일치
    if (password2 !== password1) {
      setErrMsgs((prev) => {
        return { ...prev, password2ErrMsg: "비밀번호가 일치하지 않습니다" };
      });
      isValid = false;
    }

    if (!isValid) return;

    setErrMsgs(initialErrState);
    const signupData = {
      email: email,
      password: password2,
      nickname: nickname,
    };
    signupHandler(signupData);
  };

  return (
    <form
      method="post"
      onSubmit={submitSignupHandler}
      className="flex flex-col items-center"
    >
      {/* 이메일 */}
      <EmailForm
        email={email}
        emailChangeHandler={inputChangeHandler}
        emailErrMsg={emailErrMsg}
      />

      {/* 닉네임 */}
      <NicknameForm
        nickname={nickname}
        inputChangeHandler={inputChangeHandler}
        nicknameErrMsg={nicknameErrMsg}
      />

      {/* 비밀번호 1 */}
      <PasswordForm
        password={password1}
        passwordChangeHandler={inputChangeHandler}
        passwordErrMsg={password1ErrMsg}
        htmlFor={"password1"}
        labelContent={"비밀번호"}
        id={"password1"}
        name={"password1"}
        placeholder={"비밀번호를 입력하세요"}
      />

      {/* 비밀번호 2 */}
      <PasswordForm
        password={password2}
        passwordChangeHandler={inputChangeHandler}
        passwordErrMsg={password2ErrMsg}
        htmlFor={"password2"}
        labelContent={"비밀번호 확인"}
        id={"password2"}
        name={"password2"}
        placeholder={"비밀번호를 한 번 더 입력하세요"}
      />

      {/* 회원가입 버튼 */}
      <SubmitButton clickHandler={submitSignupHandler}>회원가입</SubmitButton>
    </form>
  );
};

export default SignupForm;
