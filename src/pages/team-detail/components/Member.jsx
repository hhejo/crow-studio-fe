import React from "react";
import { IoClose } from "react-icons/io5";

const Member = (props) => {
  const { isLeader, memberNickname, memberSeq, deleteMember } = props;

  const clickHandler = () => deleteMember(memberNickname, memberSeq);

  return (
    <div className="flex flex-col items-center p-2">
      <div className="text-white text-sm flex items-center">
        {memberNickname}

        {isLeader && (
          <IoClose
            className="cursor-pointer text-point_pink hover:text-point_red hover:scale-125 transition"
            onClick={clickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Member;
