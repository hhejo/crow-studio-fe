// React
import { useState } from "react";
// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const MypageModifyForm = (props) => {
  const { modifyNickname, resign, modifyPassword, modifyGit } = props;

  const [nickname, setNickname] = useState("");
  const [nicknameErrMsg, setNicknameErrMsg] = useState("");

  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password0ErrMsg, setPassword0ErrMsg] = useState("");
  const [password1ErrMsg, setPassword1ErrMsg] = useState("");
  const [password2ErrMsg, setPassword2ErrMsg] = useState("");

  const [gitUsername, setGitUsername] = useState("");
  const [gitToken, setGitToken] = useState("");
  const [gitUsernameErrMsg, setGitUsernameErrMsg] = useState("");
  const [gitTokenErrMsg, setGitTokenErrMsg] = useState("");

  // 닉네임, 비밀번호0, 비밀번호1, 비밀번호2 입력창 onChange 핸들러
  const inputChangeHandler = (e) => {
    const { name: eName, value: eValue } = e.target; // eName: 입력창 이름, eValue: 입력창 입력 값
    if (eName === "nickname") {
      setNickname(eValue);
      setNicknameErrMsg("");
    } else if (eName === "password0") {
      setPassword0(eValue);
      setPassword0ErrMsg("");
    } else if (eName === "password1") {
      setPassword1(eValue);
      setPassword1ErrMsg("");
    } else if (eName === "password2") {
      setPassword2(eValue);
      setPassword2ErrMsg("");
    } else if (eName === "gitUsername") {
      setGitUsername(eValue);
      setGitUsernameErrMsg("");
    } else if (eName === "gitToken") {
      setGitToken(eValue);
      setGitTokenErrMsg("");
    }
  };

  // 닉네임 수정 핸들러
  const modifyNicknameHandler = (e) => {
    e.preventDefault();
    setNicknameErrMsg("");
    let msg = "";
    if (nickname.trim().length === 0) {
      msg = "변경할 닉네임을 입력하세요";
      setNicknameErrMsg(msg);
      return;
    } else if (nickname.trim().length > 10) {
      msg = "변경할 닉네임을 10자 이하로 입력하세요";
      setNicknameErrMsg(msg);
      return;
    }
    setNicknameErrMsg("");
    setNicknameErrMsg("");
    modifyNickname(nickname);
  };

  // 비밀번호 변경 핸들러
  const modifyPasswordHandler = (e) => {
    e.preventDefault();
    setPassword0ErrMsg("");
    setPassword1ErrMsg("");
    setPassword2ErrMsg("");
    let isValid = true;
    let msg = "";
    // 비밀번호 0
    if (password0.trim().length === 0) {
      msg = "기존 비밀번호를 입력하세요";
      setPassword0ErrMsg(msg);
      isValid = false;
    } else if (password0.trim().length < 6 || password0.trim().length > 20) {
      msg = "기존 비밀번호를 6자 이상 20자 이하로 입력하세요";
      setPassword0ErrMsg(msg);
      isValid = false;
    }
    // 비밀번호 1
    if (password1.trim().length === 0) {
      msg = "변경할 비밀번호를 입력하세요";
      setPassword1ErrMsg(msg);
      isValid = false;
    } else if (password1.trim().length < 6 || password1.trim().length > 20) {
      msg = "변경할 비밀번호를 6자 이상 20자 이하로 입력하세요";
      setPassword1ErrMsg(msg);
      isValid = false;
    }
    // 비밀번호 2
    if (password2.trim().length === 0) {
      msg = "변경할 비밀번호를 한 번 더 입력하세요";
      setPassword2ErrMsg(msg);
      isValid = false;
    } else if (password2.trim().length < 6 || password2.trim().length > 20) {
      msg = "변경할 비밀번호를 6자 이상 20자 이하로 입력하세요";
      setPassword2ErrMsg(msg);
      isValid = false;
    }
    // 비밀번호 불일치
    if (password1 !== password2) {
      msg = "변경할 비밀번호가 일치하지 않습니다";
      setPassword2ErrMsg(msg);
      isValid = false;
    }
    if (!isValid) return;
    setPassword0ErrMsg("");
    setPassword1ErrMsg("");
    setPassword2ErrMsg("");
    modifyPassword();
  };

  // 깃 아이디, 토큰 변경 핸들러
  const modifyGitHandler = (e) => {
    e.preventDefault();
    setGitUsernameErrMsg("");
    setGitTokenErrMsg("");
    let isValid = true;
    let msg = "";
    if (gitUsername.trim().length === 0) {
      msg = "깃 아이디를 입력하세요";
      setNicknameErrMsg(msg);
      isValid = false;
    }
    if (gitToken.trim().length === 0) {
      msg = "깃 토큰을 입력하세요";
      setGitTokenErrMsg(msg);
      isValid = false;
    }
    if (!isValid) return;
    setGitUsernameErrMsg("");
    setGitTokenErrMsg("");
    modifyGit();
  };

  // 회원 탈퇴 핸들러
  const resignHandler = () => resign();

  return (
    <section
      className="lg:w-[700px] md:w-[400px] sm:w-[600px] w-[400px] p-8 flex flex-col border border-primary_-2_dark rounded-md overflow-auto"
      style={{ height: "calc(100% - 80px)" }}
    >
      <div className="flex mb-5 justify-between items-center">
        <div className="text-white text-xl font-bold">회원정보 수정</div>
      </div>
      {/* 닉네임 변경 폼 */}
      <form
        method="post"
        onSubmit={modifyNicknameHandler}
        className="flex flex-col items-center mb-8"
      >
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="변경할 닉네임을 입력하세요"
          htmlFor="nickname"
          labelContent="닉네임"
          value={nickname}
          onChange={inputChangeHandler}
          errMsg={nicknameErrMsg}
        />
        <Button type="submit" onClick={modifyNicknameHandler}>
          변경하기
        </Button>
      </form>

      <hr className="border-primary_-2_dark mb-5" />

      {/* 비밀번호 변경 폼 */}
      <form
        method="post"
        onSubmit={modifyPasswordHandler}
        className="flex flex-col items-center mb-8"
      >
        {/* 비밀번호 0 (기존 비밀번호) */}
        <Input
          type="password"
          id="password0"
          name="password0"
          placeholder="기존 비밀번호를 입력하세요"
          htmlFor="password0"
          labelContent="기존 비밀번호"
          value={password0}
          onChange={inputChangeHandler}
          errMsg={password0ErrMsg}
        />

        {/* 비밀번호 1 (변경할 비밀번호) */}
        <Input
          type="password"
          id="password1"
          name="password1"
          placeholder="변경할 비밀번호를 입력하세요"
          htmlFor="password1"
          labelContent="변경할 비밀번호"
          value={password1}
          onChange={inputChangeHandler}
          errMsg={password1ErrMsg}
        />

        {/* 비밀번호 2 (변경할 비밀번호 확인) */}
        <Input
          type="password"
          id="password2"
          name="password2"
          placeholder="변경할 비밀번호를 한 번 더 입력하세요"
          htmlFor="password2"
          labelContent="변경할 비밀번호 확인"
          value={password2}
          onChange={inputChangeHandler}
          errMsg={password2ErrMsg}
        />
        <Button type="submit" onClick={modifyPasswordHandler}>
          변경하기
        </Button>
      </form>

      <hr className="border-primary_-2_dark mb-5" />

      {/* 깃 변경 폼 */}
      <form
        method="post"
        onSubmit={modifyGitHandler}
        className="flex flex-col items-center mb-8"
      >
        {/* 깃 아이디 */}
        <Input
          type="text"
          id="gitUsername"
          name="gitUsername"
          placeholder="깃 아이디를 입력하세요"
          htmlFor="gitUsername"
          labelContent="깃 아이디"
          value={gitUsername}
          onChange={inputChangeHandler}
          errMsg={gitUsernameErrMsg}
        />

        {/* 깃 토큰 */}
        <Input
          type="text"
          id="gitToken"
          name="gitToken"
          placeholder="깃 토큰을 입력하세요"
          htmlFor="gitToken"
          labelContent="깃 토큰"
          value={gitToken}
          onChange={inputChangeHandler}
          errMsg={gitTokenErrMsg}
        />
        <Button type="submit" onClick={modifyGitHandler}>
          변경하기
        </Button>
      </form>

      {/* 회원 탈퇴 버튼 */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="w-80 text-lg font-bold text-component_dark bg-point_pink hover:bg-point_red hover:text-white py-2 px-6 rounded-md mb-4 transition"
          onClick={resignHandler}
        >
          탈퇴하기
        </button>
      </div>
    </section>
  );
};
