import React, { useState } from "react";

const initialInputState = {
  currentPassword: "",
  password1: "",
  password2: "",
};

const initialErrorState = {
  currentPasswordErrMsg: "",
  password1ErrMsg: "",
  password2ErrMsg: "",
};

const PasswordForm = ({ updatePassword }) => {
  const [inputs, setInputs] = useState(initialInputState);
  const [errMsg, setErrMsg] = useState(initialErrorState);
  const { currentPassword, password1, password2 } = inputs;
  const { currentPasswordErrMsg, password1ErrMsg, password2ErrMsg } = errMsg;

  const inputChangeHandler = (e) => {
    if (e.target.name === "currentPassword") {
      setInputs((prev) => {
        return { ...prev, currentPassword: e.target.value };
      });
    } else if (e.target.name === "password1") {
      setInputs((prev) => {
        return { ...prev, password1: e.target.value };
      });
    } else if (e.target.name === "password2") {
      setInputs((prev) => {
        return { ...prev, password2: e.target.value };
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let isInvalid = false;
    setErrMsg(initialErrorState);
    if (currentPassword.trim().length === 0) {
      setErrMsg((prev) => {
        return { ...prev, currentPasswordErrMsg: "현재 비밀번호를 입력하세요" };
      });
      isInvalid = true;
    }
    if (password1.trim().length === 0) {
      setErrMsg((prev) => {
        return { ...prev, password1ErrMsg: "변경할 비밀번호를 입력하세요" };
      });
      isInvalid = true;
    }
    if (password2.trim().length === 0) {
      setErrMsg((prev) => {
        return {
          ...prev,
          password2ErrMsg: "변경할 비밀번호를 한번 더 입력하세요",
        };
      });
      isInvalid = true;
    }
    if (password1.trim() !== password2.trim()) {
      setErrMsg((prev) => {
        return {
          ...prev,
          password2ErrMsg: "비밀번호가 일치하지 않습니다",
        };
      });
      isInvalid = true;
    }
    if (isInvalid) {
      return;
    }
    const passwordData = {
      userPassword: currentPassword,
      userNewPassword: password1,
    };
    setErrMsg(initialErrorState);
    updatePassword(passwordData);
    setInputs(initialInputState);
  };

  return (
    <form
      method="post"
      onSubmit={submitHandler}
      className="flex flex-col items-center mb-8 text-primary_dark"
    >
      {/*  */}
      <div className="w-80">
        <label htmlFor="currentPassword" className="text-sm">
          현재 비밀번호
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="mt-1 w-full text-white bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
          value={currentPassword}
          onChange={inputChangeHandler}
        />
        <div className="h-6 font-normal mt-1 ml-3 mb-0.5 text-sm text-point_purple">
          {currentPasswordErrMsg}
        </div>
      </div>

      {/* Password 1 */}
      <div className="w-80">
        <label htmlFor="password1" className="text-sm">
          변경할 비밀번호
        </label>
        <input
          type="password"
          id="password1"
          name="password1"
          className="mt-1 w-full text-white bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
          value={password1}
          onChange={inputChangeHandler}
        />
        <div className="h-6 font-normal mt-1 ml-3 mb-0.5 text-sm text-point_purple">
          {password1ErrMsg}
        </div>
      </div>

      {/* Password 2 */}
      <div className="w-80 mb-2">
        <label htmlFor="password2" className="text-sm">
          변경할 비밀번호 확인
        </label>
        <input
          type="password"
          id="password2"
          name="password2"
          className="mt-1 w-full text-white bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
          value={password2}
          onChange={inputChangeHandler}
        />
        <div className="h-6 font-normal mt-1 ml-3 mb-0.5 text-sm text-point_purple">
          {password2ErrMsg}
        </div>
      </div>

      <button
        type="submit"
        className="w-80 text-md font-bold text-component_dark bg-point_light_yellow hover:bg-point_yellow py-2 px-6 rounded-md transition"
        onClick={submitHandler}
      >
        변경하기
      </button>
    </form>
  );
};

export default PasswordForm;
