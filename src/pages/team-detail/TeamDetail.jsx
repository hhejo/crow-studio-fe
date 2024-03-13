import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  doc,
  collection,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestore } from "../../firebase";

import TeamDetailHeader from "./TeamDetailHeader";
import TeamDetailMain from "./TeamDetailMain";
import AddTeammateModal from "./components/AddTeammateModal";

// MySwal.fire SweetAlert 옵션
const alertOption = {
  showCancelButton: true,
  confirmButtonText: "네",
  cancelButtonText: "아니오",
  background: "#3C3C3C",
};

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamDocId } = useParams();
  const { uid, docId } = useSelector((state) => state.user.value);
  const MySwal = withReactContent(Swal);
  const [team, setTeam] = useState({});
  const {
    teamName,
    leaderNickname,
    leaderUid,
    teammates,
    projectType,
    teamGit,
  } = team;
  const [enteredUserNickname, setEnteredUserNickname] = useState("");
  const [findResults, setFindResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // modal
  const [showModifyProjectTypeSelect, setShowModifyProjectTypeSelect] =
    useState(false);
  const [showModifyTeamNameInput, setShowModifyTeamNameInput] = useState(false);
  const [teammateList, setTeammateList] = useState([]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const docRef = doc(firestore, "teams", teamDocId);
        const documentSnapshot = await getDoc(docRef);
        const teamFetched = documentSnapshot.data();
        setTeam(teamFetched);
        const { teammates: teammatesFetched } = teamFetched;
        for (let teammateFetched of teammatesFetched) {
          const docRef = doc(firestore, "users", teammateFetched);
          const documentSnapshot = await getDoc(docRef);
          const { id: teammateDocId } = documentSnapshot;
          const { nickname: teammateNickname } = documentSnapshot.data();
          const newTeammate = { teammateDocId, teammateNickname };
          setTeammateList((prev) => [...prev, newTeammate]);
        }
      } catch (err) {
        console.error(err);
        // 404: navigate("/404", { replace: true })
        // 403: navigate("/403", { replace: true })
      }
    }
    fetchTeam();
  }, [teamDocId]);

  // 팀명 수정
  const modifyTeamNameHandler = async (modifiedTeamName) => {
    try {
      const teamsDocRef = doc(firestore, "teams", teamDocId); // teamDocId인 documenetReference
      await updateDoc(teamsDocRef, { teamName: modifiedTeamName }); // 수정된 팀 이름으로 적용
      const documentSnapshot = await getDoc(teamsDocRef); // 팀명 변경된 teamDocId인 documentSnapshot 가져옴
      setTeam(documentSnapshot.data()); // team 정보 업데이트
      setShowModifyTeamNameInput(false); // 팀명 수정 입력창 숨기기
      toast.success("팀명을 성공적으로 변경했습니다");
    } catch (err) {
      console.error(err); // 409: 이미 같은 팀 이름이 존재, 403, 404
    }
  };

  // 팀 삭제
  const deleteTeamHandler = async () => {
    if (uid !== leaderUid) return;
    const alertTitle = "정말로 팀을 삭제하시겠습니까?";
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    if (teammates.length > 0) {
      toast.warning("팀원이 있으면 팀을 삭제할 수 없습니다");
      return;
    }
    try {
      // 1. 현재 팀 삭제하기
      const documentRef = doc(firestore, "teams", teamDocId);
      await deleteDoc(documentRef);
      // 2. 팀 리더의 teams에서 현재 팀 삭제하기
      const updateTeamsField = { teams: arrayRemove(teamDocId) };
      await updateDoc(doc(firestore, "users", docId), updateTeamsField);
      navigate("/teams", { replace: true });
      toast.success("팀 삭제 성공");
    } catch (err) {
      console.error(err);
    }
  };

  // 팀 탈퇴
  const resignTeamHandler = async () => {
    if (uid === leaderUid) return;
    const alertTitle = "정말로 팀에서 탈퇴하시겠습니까?";
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    try {
      // 1. 현재 팀의 teammates 필드에서 본인 삭제하기
      const updateTeammatesField = { teammates: arrayRemove(docId) };
      await updateDoc(doc(firestore, "teams", teamDocId), updateTeammatesField);
      // 2. 해당 팀원의 teams 필드에 현재 팀 삭제하기
      const updateTeamsField = { teams: arrayRemove(teamDocId) };
      await updateDoc(doc(firestore, "users", docId), updateTeamsField);
      navigate("/teams", { replace: true });
      toast.success("팀 탈퇴 성공");
    } catch (err) {
      console.error(err);
    }
  };

  // 팀원 검색 (닉네임으로)
  const findTeammateHandler = async (nicknameToFind) => {
    setFindResults([]);
    const documentRef = collection(firestore, "users");
    const q = query(documentRef, where("nickname", "==", nicknameToFind));
    const querySnapshot = await getDocs(q);
    for (let document of querySnapshot.docs) {
      if (document.id === docId) continue; // 본인은 검색 시 나오지 않게
      const { uid, nickname, email } = document.data();
      // const info = { uid, teammateDocId: document.id, nickname, email };
      const info = {
        teammateUid: uid,
        teammateDocId: document.id,
        teammateNickname: nickname,
        teammateEmail: email,
      };
      setFindResults((prev) => [...prev, info]);
    }
  };

  // 팀원 추가
  const addTeammateHandler = async (teammateToAdd) => {
    const { teammateUid, teammateDocId, teammateNickname } = teammateToAdd;
    if (teammateUid === uid) return; // 본인을 팀원으로 추가할 수 없음
    const alertTitle = `${teammateNickname}님을 팀원으로 추가할까요?`;
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    try {
      // 1. 현재 팀의 teammates 필드에 팀원 추가하기
      const updateTeammatesField = { teammates: arrayUnion(teammateDocId) };
      await updateDoc(doc(firestore, "teams", teamDocId), updateTeammatesField);
      // 2. 해당 팀원의 teams 필드에 현재 팀 추가하기
      const updateTeamsField = { teams: arrayUnion(teamDocId) };
      await updateDoc(doc(firestore, "users", teammateDocId), updateTeamsField);
      // 3. team 갱신하기
      const teamsDocRef = doc(firestore, "teams", teamDocId);
      const documentSnapshot = await getDoc(teamsDocRef);
      const updatedTeam = documentSnapshot.data();
      setTeam(updatedTeam);
      // 4. teammateList 갱신하기 (teammates와 다름) <- 리팩토링 필요
      setTeammateList([]);
      const { teammates: teammatesFetched } = updatedTeam;
      for (let teammateFetched of teammatesFetched) {
        const docRef = doc(firestore, "users", teammateFetched);
        const documentSnapshot = await getDoc(docRef);
        const { id: teammateDocId } = documentSnapshot;
        const { nickname: teammateNickname } = documentSnapshot.data();
        const newTeammate = { teammateDocId, teammateNickname };
        setTeammateList((prev) => [...prev, newTeammate]);
      }
      toast.success("팀원 추가 성공");
    } catch (err) {
      console.error(err); // 409: 이미 추가된 팀원
    }
  };

  // 팀원 삭제
  const removeTeammateHandler = async (teammateNickname, teammateDocId) => {
    const alertTitle = `${teammateNickname}님을 팀에서 삭제하시겠습니까?`;
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    try {
      // 1. 현재 팀의 teammates 필드의 팀원 삭제하기
      const updateTeammatesField = { teammates: arrayRemove(teammateDocId) };
      await updateDoc(doc(firestore, "teams", teamDocId), updateTeammatesField);
      // 2. 해당 팀원의 teams 필드의 현재 팀 삭제하기
      const updateTeamsField = { teams: arrayRemove(teamDocId) };
      await updateDoc(doc(firestore, "users", teammateDocId), updateTeamsField);
      // 3. team 갱신하기
      const teamsDocRef = doc(firestore, "teams", teamDocId);
      const documentSnapshot = await getDoc(teamsDocRef);
      const updatedTeam = documentSnapshot.data();
      setTeam(updatedTeam);
      // 4. teammateList 갱신하기 (teammates와 다름) <- 리팩토링 필요
      setTeammateList([]);
      const { teammates: teammatesFetched } = updatedTeam;
      for (let teammateFetched of teammatesFetched) {
        const docRef = doc(firestore, "users", teammateFetched);
        const documentSnapshot = await getDoc(docRef);
        const { id: teammateDocId } = documentSnapshot;
        const { nickname: teammateNickname } = documentSnapshot.data();
        const newTeammate = { teammateDocId, teammateNickname };
        setTeammateList((prev) => [...prev, newTeammate]);
      }
      toast.success("팀원 삭제 성공");
    } catch (err) {
      console.error(err);
    }
  };

  // 프로젝트 타입 변경
  const modifyProjectTypeHandler = async (modifiedProjectType) => {
    if (projectType === modifiedProjectType) {
      toast.warning("변경하려는 프로젝트 타입이 이전과 동일합니다");
      setShowModifyProjectTypeSelect(false);
      return;
    }
    try {
      const teamsDocRef = doc(firestore, "teams", teamDocId); // 팀명 수정과 동일
      await updateDoc(teamsDocRef, { projectType: modifiedProjectType }); // 팀명 수정과 동일
      const documentSnapshot = await getDoc(teamsDocRef); // 팀명 수정과 동일
      setTeam(documentSnapshot.data()); // 팀명 수정과 동일
      toast.success("프로젝트 타입을 성공적으로 변경했습니다");
    } catch (err) {
      console.error(err); // 401: JWT가 없거나 틀림, 403: Forbidden, 404: Not Found
    } finally {
      setShowModifyProjectTypeSelect(false);
    }
  };

  return (
    <>
      {/* 팀원 추가 모달 */}
      <AddTeammateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        enteredUserNickname={enteredUserNickname}
        setEnteredUserNickname={setEnteredUserNickname}
        findTeammate={findTeammateHandler}
        findResults={findResults}
        addTeammate={addTeammateHandler}
      />

      {/* team detail */}
      <div
        data-aos="fade-in"
        className="flex flex-wrap items-center justify-center m-3 mb-6 h-full"
      >
        <div className="p-8 lg:w-4/5 w-fit max-w-[1000px] h-fit flex flex-col justify-center items-center border border-primary_-2_dark rounded-md">
          {/* 팀 상세 정보 */}
          <div className="text-4xl font-bold text-white pb-2 mb-5 w-full">
            팀 상세 정보
          </div>

          {/* TeamDetailHeader */}
          <TeamDetailHeader
            teamName={teamName}
            isLeader={leaderUid === uid}
            modifyTeamName={modifyTeamNameHandler}
            showModifyTeamNameInput={showModifyTeamNameInput}
            setShowModifyTeamNameInput={setShowModifyTeamNameInput}
            deleteTeam={deleteTeamHandler}
            resignTeam={resignTeamHandler}
          />

          {/* 팀장, 팀원, 팀 깃 주소, 프로젝트 타입 */}
          <TeamDetailMain
            leaderNickname={leaderNickname}
            isLeader={leaderUid === uid}
            // teammates={teammates}
            teammateList={teammateList}
            teamGit={teamGit}
            //
            showModifyProjectTypeSelect={showModifyProjectTypeSelect}
            setShowModifyProjectTypeSelect={setShowModifyProjectTypeSelect}
            projectType={projectType}
            modifyProjectType={modifyProjectTypeHandler}
            //
            removeTeammate={removeTeammateHandler}
            openModal={() => setIsModalOpen(true)}
          />

          {/* 팀 목록 이동 버튼, 프로젝트 이동 버튼 */}
          <div className="w-full flex justify-end gap-4">
            <button
              onClick={() => navigate("/teams")}
              className="w-40 h-12 text-lg font-bold text-primary_dark bg-component_item_bg_dark border border-primary_-2_dark hover:bg-component_item_bg_+2_dark hover:text-white rounded-md transition"
            >
              팀 목록
            </button>
            <button
              onClick={() => navigate(`/project/${teamDocId}`)}
              className="w-40 h-12 text-lg font-bold bg-point_purple text-component_dark hover:bg-point_purple_-2 hover:text-white rounded-md transition"
            >
              프로젝트로 이동
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetail;
