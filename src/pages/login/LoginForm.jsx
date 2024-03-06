import { useState } from "react";
import { EmailForm } from "../../components/forms/EmailForm";
import { PasswordForm } from "../../components/forms/PasswordForm";
import SubmitButton from "../../components/SubmitButton";

// 이메일 정규표현식
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

// const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

// LoginForm
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const emailChangeHandler = (e) => setEmail(e.target.value);
  const passwordChangeHandler = (e) => setPassword(e.target.value);

  const loginHandler = (e) => {
    e.preventDefault();
    let isValid = true;
    setEmailErrMsg("");
    setPasswordErrMsg("");
    if (email.trim().length === 0) {
      setEmailErrMsg("이메일을 입력하세요");
      isValid = false;
    } else if (!emailRegEx.test(email)) {
      setEmailErrMsg("이메일 형식이 올바르지 않습니다");
      isValid = false;
    }
    if (password.trim().length === 0) {
      setPasswordErrMsg("비밀번호를 입력하세요");
      isValid = false;
    }

    if (!isValid) return;

    setEmailErrMsg("");
    setPasswordErrMsg("");
    const loginData = { email, password };
    onLogin(loginData);
  };

  return (
    <form
      method="post"
      onSubmit={loginHandler}
      className="flex flex-col items-center"
    >
      {/* 이메일 */}
      <EmailForm
        email={email}
        onChangeHandler={emailChangeHandler}
        errMsg={emailErrMsg}
        placeholder="이메일을 입력하세요"
      />

      {/* 비밀번호 */}
      <PasswordForm
        password={password}
        onChangeHandler={passwordChangeHandler}
        errMsg={passwordErrMsg}
        htmlFor="password"
        labelContent="비밀번호"
        id="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
      />

      {/* 로그인 버튼 */}
      <SubmitButton onClickHandler={loginHandler}>로그인</SubmitButton>
    </form>
  );
};

export default LoginForm;
