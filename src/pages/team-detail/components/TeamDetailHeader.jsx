import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import teamApi from "../../../api/teamApi";

import TeamName from "./TeamName";
import TeamNameUpdateInput from "./TeamNameUpdateInput";
import RedButton from "./RedButton";

const TeamDetailHeader = (props) => {
  const { teamName, isLeader, teamUid, setTeamName } = props;
  const navigate = useNavigate();
  const [showTeamNameUpdate, setShowTeamNameUpdate] = useState(false);
  const MySwal = withReactContent(Swal);

  const openTeamNameUpdateHandler = () => setShowTeamNameUpdate(true);
  const closeTeamNameUpdateHandler = () => setShowTeamNameUpdate(false);

  const submitTeamNameUpdateHandler = async (updatedTeamName) => {
    try {
      const teamNameData = { teamName: updatedTeamName };
      await teamApi.updateTeamName(teamUid, teamNameData);
      setTeamName(updatedTeamName);
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
        <TeamName
          openTeamNameUpdate={openTeamNameUpdateHandler}
          isLeader={isLeader}
        >
          {teamName}
        </TeamName>
      ) : (
        <TeamNameUpdateInput
          initialTeamName={teamName}
          submitTeamNameUpdate={submitTeamNameUpdateHandler}
          closeTeamNameUpdate={closeTeamNameUpdateHandler}
        />
      )}
      {/* 팀 목록 버튼, 팀 삭제(팀 탈퇴) 버튼 컨테이너 */}
      <div className="flex gap-2">
        <RedButton onClick={isLeader ? deleteTeamHandler : resignTeamHandler}>
          {isLeader ? "팀 삭제" : "팀 탈퇴"}
        </RedButton>
      </div>
    </div>
  );
};

export default TeamDetailHeader;
