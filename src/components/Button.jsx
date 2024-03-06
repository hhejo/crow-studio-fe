export const Button = (props) => {
  const { type, onClick, children } = props;

  return (
    <button
      type={type}
      className="w-80 text-lg font-bold text-component_dark bg-point_light_yellow hover:bg-point_yellow py-2 px-6 rounded-md transition mb-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
