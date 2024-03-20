import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { startLoading, stopLoading } from "../../redux/global-slice";
import { LoadingScreen } from "../../components/LoadingScreen";
import { TeamCreateForm } from "./TeamCreateForm";

const TeamCreate = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { isLoading } = useSelector((state) => state.global.value);
  const { uid, docId, nickname, imageURL } = useSelector(
    (state) => state.user.value
  );

  const createTeamHandler = async (newTeamData) => {
    try {
      await dispatch(startLoading());
      const newTeam = {
        teamName: newTeamData.teamName,
        leaderUid: uid,
        leaderNickname: nickname,
        leaderImageURL: imageURL,
        teamGit: newTeamData.teamGit,
        projectType: newTeamData.projectType,
        teammates: [],
      };
      const { id: teamUid } = await addDoc(
        collection(firestore, "teams"),
        newTeam
      );
      const updateField = { teams: arrayUnion(teamUid) };
      await updateDoc(doc(firestore, "users", docId), updateField);
      toast.success("팀 생성 완료");
      navigate("/teams", { replace: true });
    } catch (e) {
      console.error("e:", e);
      // 409: 이미 해당 이름으로 생성된 팀이 있습니다
      // 404: 해당 깃 주소가 유효하지 않습니다
      // 403: 깃 계정과 연결되어 있지 않습니다
    } finally {
      await dispatch(stopLoading());
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <div className="h-full flex flex-wrap justify-center items-center">
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
        </div>
      )}
    </>
  );
};

export default TeamCreate;
