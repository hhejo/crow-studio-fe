// React
import { useState } from "react";
// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// 이메일 정규표현식
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export const LoginForm = (props) => {
  const { login } = props;

  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호

  const [emailErrMsg, setEmailErrMsg] = useState(""); // 이메일 에러 메시지
  const [passwordErrMsg, setPasswordErrMsg] = useState(""); // 비밀번호 에러 메시지

  // 이메일 입력창 onChange 핸들러
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    setEmailErrMsg("");
  };

  // 비밀번호 입력창 onChange 핸들러
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErrMsg("");
  };

  // 입력 값 유효한지 검사하는 함수
  const checkIsValid = () => {
    let isValid = true; // 로그인 입력 값들의 유효 여부
    let msg = ""; // 띄울 에러 메시지
    // 이메일
    if (email.trim().length === 0) {
      msg = "이메일을 입력하세요";
      setEmailErrMsg(msg);
      isValid = false;
    } else if (!emailRegEx.test(email)) {
      msg = "이메일 형식이 올바르지 않습니다";
      setEmailErrMsg(msg);
      isValid = false;
    }
    // 비밀번호
    if (password.trim().length === 0) {
      msg = "비밀번호를 입력하세요";
      setPasswordErrMsg(msg);
      isValid = false;
    }
    return isValid;
  };

  // 로그인 제출 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    setEmailErrMsg("");
    setPasswordErrMsg("");
    if (!checkIsValid()) return; // 하나라도 유효하지 않으면 종료
    setEmailErrMsg("");
    setPasswordErrMsg("");
    const loginData = { email, password }; // 로그인 정보
    login(loginData); // 로그인 정보 전달
  };

  return (
    <form
      method="post"
      onSubmit={submitHandler}
      className="flex flex-col items-center"
    >
      {/* 이메일 */}
      <Input
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
      <Input
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
