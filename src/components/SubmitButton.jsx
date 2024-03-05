const SubmitButton = (props) => {
  const { clickHandler, children } = props;

  return (
    <button
      type="submit"
      className="w-80 text-lg font-bold text-component_dark bg-point_light_yellow hover:bg-point_yellow py-2 px-6 rounded-md transition mb-4"
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
