// React
import { useState } from "react";
// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import PasswordForm from "./components/PasswordForm";
import GitForm from "./components/GitForm";

export const MypageModifyForm = (props) => {
  const { modifyNickname, resign } = props;

  const [modifiedNickname, setModifiedNickname] = useState("");
  const [nicknameErrMsg, setNicknameErrMsg] = useState("");

  //  닉네임 변경 입력창 onChange 핸들러
  const changeNicknameHandler = (e) => {
    setModifiedNickname(e.target.value);
    setNicknameErrMsg("");
  };

  // 닉네임 수정 핸들러
  const modifyNicknameHandler = (e) => {
    e.preventDefault();
    setNicknameErrMsg("");
    let msg = "";
    if (modifiedNickname.trim().length === 0) {
      msg = "닉네임을 입력하세요";
      setNicknameErrMsg(msg);
      return;
    } else if (modifiedNickname.trim().length > 10) {
      msg = "닉네임을 10자 이하로 입력하세요";
      setNicknameErrMsg(msg);
      return;
    }
    setModifiedNickname("");
    setNicknameErrMsg("");
    modifyNickname(modifiedNickname);
  };

  // 비밀번호 변경 핸들러
  // const submitPasswordHandler = (passwordData) => {
  //   userApi
  //     .updatePassword(passwordData)
  //     .then(toast.success("비밀번호를 성공적으로 변경했습니다"))
  //     .catch((errorStatusCode) => {
  //       console.log(errorStatusCode);
  //       if (errorStatusCode.response.status === 409) {
  //         toast.warning("현재 비밀번호가 틀립니다");
  //       } else {
  //         toast.error("Error");
  //       }
  //     });
  // };

  // 회원 탈퇴 핸들러
  const resignHandler = () => resign();

  // const updateGitAuthHandler = (credentialsData) => {
  //   dispatch(updateGitAuth(credentialsData))
  //     .unwrap()
  //     .then(() => toast.success("깃 연결 성공"))
  //     .catch(console.error);
  // };

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
          placeholder="닉네임을 입력하세요"
          htmlFor="nickname"
          labelContent="닉네임"
          value={modifiedNickname}
          onChange={changeNicknameHandler}
          errMsg={nicknameErrMsg}
        />
        <Button type="submit" onClick={modifyNicknameHandler}>
          변경하기
        </Button>
      </form>

      <hr className="border-primary_-2_dark mb-5" />

      {/* 비밀번호 변경 폼 */}
      <PasswordForm
      // updatePassword={submitPasswordHandler}
      />

      <hr className="border-primary_-2_dark mb-5" />

      {/* 깃 변경 폼 */}
      <GitForm
      // initialGitUsername={myGitUsername}
      // updateGitAuth={updateGitAuthHandler}
      />

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
