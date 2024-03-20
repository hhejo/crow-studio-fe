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

const TeamCreate = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { docId, nickname } = useSelector((state) => state.user.value);
  const { imageURL } = useSelector((state) => state.user.value);

  // 팀 생성 핸들러
  const createTeamHandler = async (teamData) => {
    dispatch(startLoading());
    try {
      const basicInfo = { ...teamData, leaderDocId: docId, teammates: [] }; // teamName, projectType, teamGit, leaderDocId, teammates
      const extraInfo = { leaderNickname: nickname, leaderImageURL: imageURL }; // leaderNickname, leaderImageURL
      const teamToAdd = { ...basicInfo, ...extraInfo }; // 생성할 팀
      const collectionRef = collection(firestore, "teams"); // firestore의 teams 컬렉션 레퍼런스
      const { id: teamDocId } = await addDoc(collectionRef, teamToAdd); // 1. firestore의 teams 컬렉션에 추가
      const updateField = { teams: arrayUnion(teamDocId) }; // teams 필드에 생성된 팀 teamDocId 추가
      await updateDoc(doc(firestore, "users", docId), updateField); // 2. firestore의 users 컬렉션에서 현재 로그인한 유저의 필드 업데이트
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
