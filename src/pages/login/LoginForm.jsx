import { useState } from "react";
import { InputForm } from "../../components/forms/InputForm";
import { Button } from "../../components/Button";

// 이메일 정규표현식
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

// LoginForm
const LoginForm = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailErrMsg("");
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErrMsg("");
  };

  const submitHandler = (e) => {
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
    login(loginData);
  };

  return (
    <form
      method="post"
      onSubmit={submitHandler}
      className="flex flex-col items-center"
    >
      {/* 이메일 */}
      <InputForm
        type="email"
        id="email"
        name="email"
        placeholder="이메일을 입력하세요"
        htmlFor="email"
        labelContent="이메일"
        value={email}
        onChange={emailChangeHandler}
        errMsg={emailErrMsg}
      />

      {/* 비밀번호 */}
      <InputForm
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        htmlFor="password"
        labelContent="비밀번호"
        value={password}
        onChange={passwordChangeHandler}
        errMsg={passwordErrMsg}
      />

      {/* 로그인 버튼 */}
      <Button type="submit" onClick={submitHandler}>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
