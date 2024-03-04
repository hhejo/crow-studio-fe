import React from "react";

const Leader = ({ teamLeaderNickname }) => {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="text-white text-sm flex items-center">
        {teamLeaderNickname}
      </div>
    </div>
  );
};

export default Leader;
