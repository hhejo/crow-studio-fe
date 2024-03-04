import React from "react";

const Member = (props) => {
  const { isLeader, memberNickname, teamLeaderNickname } = props;

  return (
    <div className="p-2">
      {/* 프사 */}
      {/* <div className="bg-point_light_yellow w-11 h-11 rounded-full"></div> */}
      {/* 닉네임 */}
      <div className={"text-sm break-all" + (isLeader ? " text-point_light_yellow" : " text-white")}>
        {isLeader ? teamLeaderNickname : memberNickname}
      </div>
    </div>
  );
};

export default Member;
