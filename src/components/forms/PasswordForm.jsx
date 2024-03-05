const PasswordForm = (props) => {
  const { password, passwordChangeHandler, passwordErrMsg } = props;
  const { htmlFor, labelContent, id, name, placeholder } = props;

  return (
    <div className="w-80 mb-1">
      <label htmlFor={htmlFor}>{labelContent}</label>
      <input
        type="password"
        id={id}
        name={name}
        className="mt-1 w-full text-white bg-component_item_bg_+2_dark transition:bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
        placeholder={placeholder}
        required
        value={password}
        onChange={passwordChangeHandler}
      />
      <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
        {passwordErrMsg}
      </div>
    </div>
  );
};

export default PasswordForm;
