import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import Header from "../../components/Header";
import TeamList from "./components/TeamList";

const Teams = () => {
  const navigate = useNavigate();
  const { docId, nickname } = useSelector((state) => state.user.value);
  const [myTeams, setMyTeams] = useState([]);

  const createTeamHandler = () => navigate("/teams/create");

  const clickTeamHandler = (teamSeq) => navigate(`/teams/${teamSeq}`);

  useEffect(() => {
    async function fetchTeams() {
      const documentSnapshot = await getDoc(doc(firestore, "users", docId));
      const { teams } = documentSnapshot.data();
      for (let teamUid of teams) {
        const documentSnapshot = await getDoc(doc(firestore, "teams", teamUid));
        const team = documentSnapshot.data();
        setMyTeams((prev) => [...prev, { ...team, teamUid }]);
      }
    }
    fetchTeams();
  }, [docId]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* 헤더 */}
      <Header />
      {/*  */}
      <div
        data-aos="fade-in"
        className="m-3 mb-6 h-full flex flex-wrap justify-center items-center"
      >
        <div className="mb-6 px-8 py-8 lg:w-4/5 w-fit max-w-[1000px] h-fit flex flex-col justify-cente border border-primary_-2_dark rounded-md overflow-auto">
          <div className="text-4xl font-bold text-white pb-2 mb-5">
            나의 팀 목록
          </div>
          {/* 타이틀 */}
          <div className="flex justify-between items-center md:mb-5 mb-2">
            {/* 팀 */}
            <div className="flex items-center">
              {/* 현재 로그인한 유저 닉네임 */}
              <span className="md:text-xl text-sm font-bold text-point_light_yellow md:mr-2 mr-1">
                {nickname}
              </span>
              {/* 제목 */}
              <span className="text-white text-sm md:font-bold mr-1">
                님의 팀
              </span>
              {/* 팀 개수 */}
              <span className="bg-point_purple_op20 text-white text-xs font-semibold mr-2 px-1.5 py-0.5 rounded">
                {myTeams.length}
              </span>
            </div>
            {/* 팀 생성 버튼 */}
            <button
              className="md:px-3 ml-4 px-2 py-1 md:text-sm text-[13px] font-bold bg-point_purple text-component_dark hover:bg-point_purple_-2 hover:text-white rounded-md transition"
              onClick={createTeamHandler}
            >
              새로운 팀 생성
            </button>
          </div>

          {/* 팀 리스트 */}
          {myTeams.length > 0 ? (
            <TeamList clickTeam={clickTeamHandler} teams={myTeams} />
          ) : (
            <div className="mt-4">팀이 없습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
