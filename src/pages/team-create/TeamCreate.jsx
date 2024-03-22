// Router, Redux
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Firebase
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { firestore } from "../../firebase";
// Slice
import { startLoading, stopLoading } from "../../redux/global-slice";
// Toast
import { toast } from "react-toastify";
// Components
import { TeamCreateForm } from "./TeamCreateForm";

// 파일, 폴더 임시 더미 데이터
const dummy = {
  id: "src",
  name: "src",
  children: [
    {
      id: "src/comps",
      name: "comps",
      children: [
        { id: "src/comps/test1", name: "test1" },
        { id: "src/comps/test2", name: "test2" },
        { id: "src/comps/snake.py", name: "snake.py" },
      ],
    },
    { id: "src/app.py", name: "app.py" },
    { id: "src/readme.md", name: "readme.md" },
    { id: "src/xyz", name: "xyz" },
  ],
};

const TeamCreate = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { docId } = useSelector((state) => state.user.value);

  // 팀 생성 핸들러
  const createTeamHandler = async (teamData) => {
    dispatch(startLoading());
    try {
      const extra = { leaderDocId: docId, teammates: [], projectDocId: null };
      const teamToAdd = { ...teamData, ...extra }; // 생성할 팀: teamName, projectType, teamGit, leaderDocId, teammates, projectDocId
      const teamsColRef = collection(firestore, "teams");
      const { id: teamDocId } = await addDoc(teamsColRef, teamToAdd); // 1. firestore의 teams 컬렉션에 생성된 팀 추가
      const updateTeamsField = { teams: arrayUnion(teamDocId) };
      await updateDoc(doc(firestore, "users", docId), updateTeamsField); // 2. firestore의 users 컬렉션에서 현재 로그인한 유저의 teams 필드에 생성된 팀 docId 추가
      const ProjectsColRef = collection(firestore, "projects");
      const projectToAdd = { teamDocId, directory: dummy, setting: {} }; // 생성할 프로젝트: teamDocId, directory, setting
      const { id: projectDocId } = await addDoc(ProjectsColRef, projectToAdd); // 3. firestore의 projects 컬렉션에 생성된 프로젝트 추가
      const updatePjtDocIdField = { projectDocId };
      await updateDoc(doc(firestore, "teams", teamDocId), updatePjtDocIdField); // 4. firestore의 teams 컬렉션에서 현재 생성된 팀의 projectDocId 필드를 생성된 프로젝트 projectDocId로 갱신
      toast.success("팀 생성 완료");
      navigate("/teams", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <main className="h-full flex flex-wrap justify-center items-center">
      <div
        data-aos="fade-in"
        className="mb-2 mx-2 xs:px-16 px-10 py-12 flex flex-col w-fit h-fit justify-center items-center border border-primary_-2_dark rounded-md overflow-auto"
      >
        {/* 제목 */}
        <div className="text-4xl font-bold text-white pb-2 mb-5">
          팀 생성하기
        </div>

        {/* 팀 생성 폼 */}
        <TeamCreateForm createTeam={createTeamHandler} />

        {/* 팀 목록 버튼 */}
        <button
          onClick={() => navigate("/teams")}
          className="xs:w-80 w-[226.03px] px-10 py-2 text-primary_dark bg-component_item_bg_dark border border-primary_-2_dark hover:bg-component_item_bg_+2_dark hover:text-white rounded-md transition"
        >
          팀 목록
        </button>
      </div>
    </main>
  );
};

export default TeamCreate;
