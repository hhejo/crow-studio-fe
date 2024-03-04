import React, { useState } from "react";

import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import LoginButton from "./components/LoginButton";

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
// const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const emailChangeHandler = (e) => setEmail(e.target.value);
  const passwordChangeHandler = (e) => setPassword(e.target.value);

  const submitLoginHandler = (e) => {
    e.preventDefault();
    let isInvalid = false;
    setEmailErrMsg("");
    setPasswordErrMsg("");
    if (email.trim().length === 0) {
      setEmailErrMsg("이메일을 입력하세요");
      isInvalid = true;
    } else if (!emailRegEx.test(email)) {
      setEmailErrMsg("이메일 형식이 올바르지 않습니다");
      isInvalid = true;
    }
    if (password.trim().length === 0) {
      setPasswordErrMsg("비밀번호를 입력하세요");
      isInvalid = true;
    }
    if (isInvalid) {
      return;
    }
    setEmailErrMsg("");
    setPasswordErrMsg("");
    const loginData = { userId: email, userPassword: password };
    onLogin(loginData);
  };

  return (
    <form
      method="post"
      onSubmit={submitLoginHandler}
      className="flex flex-col items-center"
    >
      {/* 이메일 */}
      <EmailForm
        email={email}
        emailChangeHandler={emailChangeHandler}
        emailErrMsg={emailErrMsg}
      />

      {/* 비밀번호 */}
      <PasswordForm
        password={password}
        passwordChangeHandler={passwordChangeHandler}
        passwordErrMsg={passwordErrMsg}
      />

      {/* 로그인 버튼 */}
      <LoginButton submitLoginHandler={submitLoginHandler}>로그인</LoginButton>
    </form>
  );
};

export default LoginForm;
