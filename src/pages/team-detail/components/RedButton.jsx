import React from "react";

const RedButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 py-1 md:text-sm text-[13px] font-bold text-component_dark bg-point_pink hover:bg-point_red hover:text-white rounded-md transition"
    >
      {children}
    </button>
  );
};

export default RedButton;
