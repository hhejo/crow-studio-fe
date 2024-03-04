import React from "react";

const Password1Form = (props) => {
  const { password1, inputChangeHandler, password1ErrMsg } = props;

  return (
    <div className="w-80 mb-1">
      <label htmlFor="password1">비밀번호</label>
      <input
        type="password"
        id="password1"
        name="password1"
        className="mt-1 w-full text-white bg-component_item_bg_+2_dark transition:bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
        placeholder="비밀번호를 입력하세요"
        required
        value={password1}
        onChange={inputChangeHandler}
      />
      <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
        {password1ErrMsg}
      </div>
    </div>
  );
};

export default Password1Form;
