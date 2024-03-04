import React from "react";

const TeamListButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-40 h-12 text-lg font-bold text-primary_dark bg-component_item_bg_dark border border-primary_-2_dark hover:bg-component_item_bg_+2_dark hover:text-white rounded-md transition"
    >
      {children}
    </button>
  );
};

export default TeamListButton;
