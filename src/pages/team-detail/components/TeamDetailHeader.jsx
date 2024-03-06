import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import teamApi from "../../../api/teamApi";

import TeamNameUpdateInput from "./TeamNameUpdateInput";

import { BsPencilFill } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

const TeamDetailHeader = (props) => {
  const { teamName, isLeader, teamUid, modifyTeamName } = props;
  const navigate = useNavigate();
  const [showTeamNameUpdate, setShowTeamNameUpdate] = useState(false);
  const MySwal = withReactContent(Swal);

  const submitTeamNameUpdateHandler = async (updatedTeamName) => {
    try {
      const teamNameData = { teamName: updatedTeamName };
      await teamApi.updateTeamName(teamUid, teamNameData);
      modifyTeamName(updatedTeamName);
      setShowTeamNameUpdate(false);
      toast.success("팀 이름 변경 성공");
    } catch (err) {
      const errStatusCode = err.response.status;
      if (errStatusCode === 409) {
        toast.warning("이미 같은 팀 이름이 존재합니다");
      } else {
        toast.error("Error");
      }
    }
  };

  const deleteTeamHandler = async () => {
    const res = await MySwal.fire({
      title: "정말로 팀을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      background: "#3C3C3C",
    });
    if (!res.isConfirmed) {
      return;
    }
    try {
      await teamApi.deleteTeam(teamUid);
      navigate("/teams");
      toast.success("팀 삭제 성공");
    } catch (err) {
      toast.error("Error");
    }
  };

  const resignTeamHandler = async () => {
    const res = await MySwal.fire({
      title: "정말로 팀에서 탈퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      background: "#3C3C3C",
    });
    if (!res.isConfirmed) {
      return;
    }
    try {
      await teamApi.resignTeam(teamUid);
      navigate("/teams");
      toast.success("팀 탈퇴 성공");
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <div className="flex justify-between items-center w-full mb-5">
      {!showTeamNameUpdate ? (
        // 팀 이름
        <h1 className="text-white text-xl font-bold flex items-center">
          {teamName}
          {isLeader && (
            <div>
              <BsPencilFill
                data-tip="팀명 변경"
                className="ml-3 mr-5 text-sm text-point_yellow_+2 cursor-pointer hover:text-point_yellow hover:scale-125 transition"
                onClick={() => setShowTeamNameUpdate(true)}
              />
              <ReactTooltip place="right" />
            </div>
          )}
        </h1>
      ) : (
        // 팀 이름 변경 입력창
        <TeamNameUpdateInput
          initialTeamName={teamName}
          submitTeamNameUpdate={submitTeamNameUpdateHandler}
          closeTeamNameUpdate={() => setShowTeamNameUpdate(false)}
        />
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

export default TeamDetailHeader;
