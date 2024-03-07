import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { IoClose } from "react-icons/io5";
import { BsPencilFill } from "react-icons/bs";

const TeamDetailHeader = (props) => {
  const { teamName, isLeader, modifyTeamName, deleteTeam, resignTeam } = props;
  const { showModifyTeamNameInput, setShowModifyTeamNameInput } = props;
  const [enteredTeamName, setEnteredTeamName] = useState(teamName);
  const modifyTeamNameHandler = (e) => {
    e.preventDefault();
    modifyTeamName(enteredTeamName);
  };
  const clickDeleteTeamHandler = () => deleteTeam();
  const clickResignTeamHandler = () => resignTeam();

  return (
    <div className="flex justify-between items-center w-full mb-5">
      {!showModifyTeamNameInput ? (
        // 팀 이름
        <h1 className="text-white text-xl font-bold flex items-center">
          {teamName}
          {isLeader && (
            <div>
              <BsPencilFill
                data-tip="팀명 변경"
                className="ml-3 mr-5 text-sm text-point_yellow_+2 cursor-pointer hover:text-point_yellow hover:scale-125 transition"
                onClick={() => setShowModifyTeamNameInput(true)}
              />
              <ReactTooltip place="right" />
            </div>
          )}
        </h1>
      ) : (
        // 팀 이름 변경 입력창
        <div data-aos="fade-in" className="flex items-center mr-2">
          <form onSubmit={modifyTeamNameHandler}>
            <input
              type="text"
              name="inputTeamName"
              id="inputTeamName"
              className="rounded-md bg-component_item_bg_+2_dark md:w-auto w-[140px] mr-1 px-4 py-1 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
              defaultValue={teamName}
              onChange={(e) => setEnteredTeamName(e.target.value)}
            />
          </form>
          <IoClose
            className="cursor-pointer text-point_pink text-xl hover:text-point_red hover:scale-125 transition"
            onClick={() => setShowModifyTeamNameInput(false)}
          />
        </div>
      )}

      {/* 팀 삭제(팀 탈퇴) 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={isLeader ? clickDeleteTeamHandler : clickResignTeamHandler}
          className="px-2 py-1 md:text-sm text-[13px] font-bold text-component_dark bg-point_pink hover:bg-point_red hover:text-white rounded-md transition"
        >
          {isLeader ? "팀 삭제" : "팀 탈퇴"}
        </button>
      </div>
    </div>
  );
};

export default TeamDetailHeader;
