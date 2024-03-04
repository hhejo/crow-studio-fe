import React, { useState } from "react";

import EmailForm from "./components/EmailForm";
import NicknameForm from "./components/NicknameForm";
import Password1Form from "./components/Password1Form";
import Password2Form from "./components/Password2Form";
import SignupButton from "./components/SignupButton";

const initialInputState = {
  email: "",
  nickname: "",
  password1: "",
  password2: "",
}; // 초기 이메일, 닉네임, 비밀번호1, 비밀번호2 상태

const initialErrState = {
  emailErrMsg: "",
  nicknameErrMsg: "",
  password1ErrMsg: "",
  password2ErrMsg: "",
};

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

const SignupForm = ({ signupHandler }) => {
  const [inputs, setInputs] = useState(initialInputState); // 초기 입력
  const [errMsgs, setErrMsgs] = useState(initialErrState); // 초기 에러메시지
  const { email, nickname, password1, password2 } = inputs; // 이메일, 비밀번호 상태 할당
  const { emailErrMsg, nicknameErrMsg, password1ErrMsg, password2ErrMsg } =
    errMsgs; // 에러메시지 상태 할당

  const inputChangeHandler = (e) => {
    const eName = e.target.name;
    const eValue = e.target.value;
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

  const submitSignupHandler = (e) => {
    e.preventDefault();
    let isInvalid = false;
    setErrMsgs(initialErrState);
    if (email.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, emailErrMsg: "이메일을 입력하세요" };
      });
      isInvalid = true;
    } else if (!emailRegEx.test(email)) {
      setErrMsgs((prev) => {
        return { ...prev, emailErrMsg: "이메일 형식이 올바르지 않습니다" };
      });
      isInvalid = true;
    }
    if (nickname.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, nicknameErrMsg: "닉네임을 입력하세요" };
      });
      isInvalid = true;
    }
    if (password1.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, password1ErrMsg: "비밀번호를 입력하세요" };
      });
      isInvalid = true;
    }
    if (password2.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, password2ErrMsg: "비밀번호를 한번 더 입력하세요" };
      });
      isInvalid = true;
    }
    if (password2 !== password1) {
      setErrMsgs((prev) => {
        return { ...prev, password2ErrMsg: "비밀번호가 일치하지 않습니다" };
      });
      isInvalid = true;
    }
    if (isInvalid) {
      return;
    }
    setErrMsgs(initialErrState);
    const signupData = {
      userId: email,
      userPassword: password2,
      userNickname: nickname,
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
        inputChangeHandler={inputChangeHandler}
        emailErrMsg={emailErrMsg}
      />

      {/* 닉네임 */}
      <NicknameForm
        nickname={nickname}
        inputChangeHandler={inputChangeHandler}
        nicknameErrMsg={nicknameErrMsg}
      />

      {/* 비밀번호 1 */}
      <Password1Form
        password1={password1}
        inputChangeHandler={inputChangeHandler}
        password1ErrMsg={password1ErrMsg}
      />

      {/* 비밀번호 2 */}
      <Password2Form
        password2={password2}
        inputChangeHandler={inputChangeHandler}
        password2ErrMsg={password2ErrMsg}
      />

      {/* 회원가입 버튼 */}
      <SignupButton onClick={submitSignupHandler}>회원가입</SignupButton>
    </form>
  );
};

export default SignupForm;
