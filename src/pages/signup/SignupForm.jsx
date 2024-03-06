import { useState } from "react";
// import { EmailForm, NicknameForm, PasswordForm } from "../../components/forms";
import { EmailForm } from "../../components/forms/EmailForm";
import { NicknameForm } from "../../components/forms/NicknameForm";
import { PasswordForm } from "../../components/forms/PasswordForm";
// import PasswordForm from "../../components/forms/PasswordForm";
import SubmitButton from "../../components/SubmitButton";

// 초기 입력 상태
const initialInputState = { email: "", nickname: "", pw1: "", pw2: "" };

// 초기 에러 메시지 상태
const initialErrState = {
  emailErrMsg: "",
  nicknameErrMsg: "",
  pw1ErrMsg: "",
  pw2ErrMsg: "",
};

// 이메일 정규표현식
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

// SignupForm
const SignupForm = ({ signup }) => {
  const [inputs, setInputs] = useState(initialInputState); // 초기 입력
  const [errMsgs, setErrMsgs] = useState(initialErrState); // 초기 에러메시지
  const { email, nickname, pw1, pw2 } = inputs; // 이메일, 비밀번호 상태 할당
  const { emailErrMsg, nicknameErrMsg, pw1ErrMsg, pw2ErrMsg } = errMsgs; // 에러메시지 상태 할당

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
    } else if (eName === "pw1") {
      setInputs((prev) => {
        return { ...prev, pw1: eValue };
      });
    } else if (eName === "pw2") {
      setInputs((prev) => {
        return { ...prev, pw2: eValue };
      });
    }
  };

  // signupHandler
  const signupHandler = (e) => {
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
    if (pw1.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, pw1ErrMsg: "비밀번호를 입력하세요" };
      });
      isValid = false;
    }
    //비밀번호 2
    if (pw2.trim().length === 0) {
      setErrMsgs((prev) => {
        return { ...prev, pw2ErrMsg: "비밀번호를 한번 더 입력하세요" };
      });
      isValid = false;
    }
    // 비밀번호 불일치
    if (pw2 !== pw1) {
      setErrMsgs((prev) => {
        return { ...prev, pw2ErrMsg: "비밀번호가 일치하지 않습니다" };
      });
      isValid = false;
    }

    if (!isValid) return;

    setErrMsgs(initialErrState);
    const signupData = { email: email, password: pw2, nickname: nickname };
    signup(signupData);
  };

  return (
    <form
      method="post"
      onSubmit={signupHandler}
      className="flex flex-col items-center"
    >
      {/* 이메일 */}
      <EmailForm
        email={email}
        onChangeHandler={inputChangeHandler}
        errMsg={emailErrMsg}
        placeholder="이메일을 입력하세요"
      />

      {/* 닉네임 */}
      <NicknameForm
        nickname={nickname}
        onChangeHandler={inputChangeHandler}
        errMsg={nicknameErrMsg}
        placeholder="닉네임을 입력하세요"
      />

      {/* 비밀번호 1 */}
      <PasswordForm
        password={pw1}
        onChangeHandler={inputChangeHandler}
        errMsg={pw1ErrMsg}
        htmlFor="pw1"
        labelContent="비밀번호"
        id="pw1"
        name="pw1"
        placeholder="비밀번호를 입력하세요"
      />

      {/* 비밀번호 2 */}
      <PasswordForm
        password={pw2}
        onChangeHandler={inputChangeHandler}
        errMsg={pw2ErrMsg}
        htmlFor="pw2"
        labelContent="비밀번호 확인"
        id="pw2"
        name="pw2"
        placeholder="비밀번호를 한 번 더 입력하세요"
      />

      {/* 회원가입 버튼 */}
      <SubmitButton onClickHandler={signupHandler}>회원가입</SubmitButton>
    </form>
  );
};

export default SignupForm;
