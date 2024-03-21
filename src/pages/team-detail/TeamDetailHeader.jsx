// React
import { useState } from "react";
// Toast
import { toast } from "react-toastify";
// Tooltip
import ReactTooltip from "react-tooltip";
// Icon
import { IoClose } from "react-icons/io5";
import { BsPencilFill } from "react-icons/bs";

export const TeamDetailHeader = (props) => {
  const { teamName, isLeader, updateTeamName, deleteTeam, resignTeam } = props;
  const { showTeamNameInput, setShowTeamNameInput } = props;
  const [enteredTeamName, setEnteredTeamName] = useState(teamName);

  const updateTeamNameHandler = (e) => {
    e.preventDefault();
    if (enteredTeamName.trim().length === 0) {
      toast.warning("변경할 팀 이름 입력");
      return;
    } else if (enteredTeamName.trim().length > 10) {
      toast.warning("팀 이름을 10자 이하로 입력");
      return;
    }
    const invalidTeamName =
      enteredTeamName.trim() === "400" ||
      enteredTeamName.trim() === "403" ||
      enteredTeamName.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
    if (invalidTeamName) {
      toast.warning("사용할 수 없는 팀 이름");
      return;
    }
    updateTeamName(enteredTeamName);
  };

  const deleteTeamHandler = () => deleteTeam();

  const resignTeamHandler = () => resignTeam();

  return (
    <div className="flex justify-between items-center w-full mb-5">
      {!showTeamNameInput ? (
        // 팀 이름
        <h1 className="text-white text-xl font-bold flex items-center">
          {teamName}
          {isLeader && (
            <div>
              <BsPencilFill
                data-tip="팀명 변경"
                className="ml-3 mr-5 text-sm text-point_yellow_+2 cursor-pointer hover:text-point_yellow hover:scale-125 transition"
                onClick={() => setShowTeamNameInput(true)}
              />
              <ReactTooltip place="right" />
            </div>
          )}
        </h1>
      ) : (
        // 팀 이름 변경 입력창
        <div data-aos="fade-in" className="flex items-center mr-2">
          <form onSubmit={updateTeamNameHandler}>
            <input
              type="text"
              name="teamName"
              id="teamName"
              className="rounded-md bg-component_item_bg_+2_dark md:w-auto w-[140px] mr-1 px-4 py-1 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
              defaultValue={teamName}
              onChange={(e) => setEnteredTeamName(e.target.value)}
            />
          </form>
          <IoClose
            className="cursor-pointer text-point_pink text-xl hover:text-point_red hover:scale-125 transition"
            onClick={() => setShowTeamNameInput(false)}
          />
        </div>
      )}

      {/* 팀 삭제(팀 탈퇴) 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={isLeader ? deleteTeamHandler : resignTeamHandler}
          className="px-2 py-1 md:text-sm text-[13px] font-bold text-component_dark bg-point_pink hover:bg-point_red hover:text-white rounded-md transition"
        >
          {isLeader ? "팀 삭제" : "팀 탈퇴"}
        </button>
      </div>
    </div>
  );
};
