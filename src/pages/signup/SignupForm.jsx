// React
import { useState } from "react";
// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// 이메일 정규표현식
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

export const SignupForm = (props) => {
  const { signup } = props;

  const [email, setEmail] = useState(""); // 이메일
  const [nickname, setNickname] = useState(""); // 닉네임
  const [password1, setPassword1] = useState(""); // 비밀번호 1
  const [password2, setPassword2] = useState(""); // 비밀번호 2

  const [emailErrMsg, setEmailErrMsg] = useState(""); // 이메일 에러 메시지
  const [nicknameErrMsg, setNicknameErrMsg] = useState(""); // 닉네임 에러 메시지
  const [password1ErrMsg, setPassword1ErrMsg] = useState(""); // 비밀번호 1 에러 메시지
  const [password2ErrMsg, setPassword2ErrMsg] = useState(""); // 비밀번호 2 에러 메시지

  // 이메일, 닉네임, 비밀번호1, 비밀번호2, 입력창 onChange 핸들러
  const inputChangeHandler = (e) => {
    const { name: eName, value: eValue } = e.target; // eName: 입력창 이름, eValue: 입력창 입력 값
    if (eName === "email") {
      setEmail(eValue);
      setEmailErrMsg("");
    } else if (eName === "nickname") {
      setNickname(eValue);
      setNicknameErrMsg("");
    } else if (eName === "password1") {
      setPassword1(eValue);
      setPassword1ErrMsg("");
    } else if (eName === "password2") {
      setPassword2(eValue);
      setPassword2ErrMsg("");
    }
  };

  // 입력 값 유효한지 검사하는 함수
  const checkIsValid = () => {
    let isValid = true; // 회원가입 입력 값들의 유효 여부
    let msg = ""; // 띄울 에러 메시지
    // 이메일
    if (email.trim().length === 0) {
      msg = "이메일을 입력하세요";
      setEmailErrMsg(msg);
      isValid = false;
    } else if (email.trim().length > 30) {
      msg = "너무 긴 이메일입니다";
      setEmailErrMsg(msg);
      isValid = false;
    } else if (!emailRegEx.test(email)) {
      msg = "이메일 형식이 올바르지 않습니다";
      setEmailErrMsg(msg);
      isValid = false;
    }
    // 닉네임
    if (nickname.trim().length === 0) {
      msg = "닉네임을 입력하세요";
      setNicknameErrMsg(msg);
      isValid = false;
    } else if (nickname.trim().length > 10) {
      msg = "닉네임을 10자 이하로 입력하세요";
      setNicknameErrMsg(msg);
      isValid = false;
    }
    // 비밀번호 1
    if (password1.trim().length === 0) {
      msg = "비밀번호를 입력하세요";
      setPassword1ErrMsg(msg);
      isValid = false;
    } else if (password1.trim().length < 6 || password1.trim().length > 20) {
      msg = "비밀번호를 6자 이상 20자 이하로 입력하세요";
      setPassword1ErrMsg(msg);
      isValid = false;
    }
    // 비밀번호 2
    if (password2.trim().length === 0) {
      msg = "비밀번호를 입력하세요";
      setPassword2ErrMsg(msg);
      isValid = false;
    } else if (password2.trim().length < 6 || password2.trim().length > 20) {
      msg = "비밀번호를 6자 이상 20자 이하로 입력하세요";
      setPassword2ErrMsg(msg);
      isValid = false;
    }
    // 비밀번호 불일치
    if (password1 !== password2) {
      msg = "비밀번호가 일치하지 않습니다";
      setPassword2ErrMsg(msg);
      isValid = false;
    }
    return isValid;
  };

  // 회원가입 제출 핸들러
  const submitHandler = (e) => {
    e.preventDefault();
    setEmailErrMsg("");
    setNicknameErrMsg("");
    setPassword1ErrMsg("");
    setPassword2ErrMsg("");
    if (!checkIsValid()) return; // 하나라도 유효하지 않으면 종료
    setEmailErrMsg("");
    setNicknameErrMsg("");
    setPassword1ErrMsg("");
    setPassword2ErrMsg("");
    const signupData = { email, nickname, password: password2 }; // 회원가입 정보
    signup(signupData); // 회원가입 정보 전달
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
        onChange={inputChangeHandler}
        errMsg={emailErrMsg}
      />

      {/* 닉네임 */}
      <Input
        type="text"
        id="nickname"
        name="nickname"
        placeholder="닉네임을 입력하세요"
        htmlFor="nickname"
        labelContent="닉네임"
        value={nickname}
        onChange={inputChangeHandler}
        errMsg={nicknameErrMsg}
      />

      {/* 비밀번호 1 */}
      <Input
        type="password"
        id="password1"
        name="password1"
        placeholder="비밀번호를 입력하세요"
        htmlFor="password1"
        labelContent="비밀번호"
        value={password1}
        onChange={inputChangeHandler}
        errMsg={password1ErrMsg}
      />

      {/* 비밀번호 2 */}
      <Input
        type="password"
        id="password2"
        name="password2"
        placeholder="비밀번호를 한 번 더 입력하세요"
        htmlFor="password2"
        labelContent="비밀번호 확인"
        value={password2}
        onChange={inputChangeHandler}
        errMsg={password2ErrMsg}
      />

      {/* 회원가입 버튼 */}
      <Button type="submit" onClick={submitHandler}>
        회원가입
      </Button>
    </form>
  );
};
