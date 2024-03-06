export const NicknameForm = (props) => {
  const { placeholder, nickname, onChangeHandler, errMsg } = props;

  return (
    <div className="w-80 mb-1">
      <label htmlFor="nickname">닉네임</label>
      <input
        type="text"
        id="nickname"
        name="nickname"
        className="mt-1 w-full text-white bg-component_item_bg_+2_dark transition:bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
        placeholder={placeholder}
        value={nickname}
        onChange={onChangeHandler}
      />
      <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
        {errMsg}
      </div>
    </div>
  );
};
