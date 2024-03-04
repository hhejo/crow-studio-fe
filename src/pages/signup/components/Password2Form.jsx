import React from "react";

const Password2Form = (props) => {
  const { password2, inputChangeHandler, password2ErrMsg } = props;

  return (
    <div className="w-80 mb-1">
      <label htmlFor="password2">비밀번호 확인</label>
      <input
        type="password"
        id="password2"
        name="password2"
        className="mt-1 w-full text-white bg-component_item_bg_+2_dark transition:bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
        placeholder="비밀번호를 한번 더 입력하세요"
        required
        value={password2}
        onChange={inputChangeHandler}
      />
      <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
        {password2ErrMsg}
      </div>
    </div>
  );
};

export default Password2Form;
