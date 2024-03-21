// React, Router, Redux
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Firebase
import { collection, doc } from "firebase/firestore";
import { getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../../firebase";
// Toast
import { toast } from "react-toastify";
// Sweet Alert
import { swalOptions, MySwal } from "../../sweet-alert";
// Components
import { TeamDetailHeader } from "./TeamDetailHeader";
import { TeamDetailMain } from "./TeamDetailMain";
import AddTeammateModal from "./components/AddTeammateModal";

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamDocId } = useParams();
  const { docId } = useSelector((state) => state.user.value);
  const [myTeam, setMyTeam] = useState({}); // myTeam: { teamName, leaderDocId, leaderNickname, projectType, teamGit }
  const { teamName, leaderDocId, leaderNickname, projectType, teamGit } =
    myTeam;
  const [showTeamNameInput, setShowTeamNameInput] = useState(false); // 팀명 변경 입력창 표시 여부
  const [myTeammates, setMyTeammates] = useState([]); // myTeammate: { docId, nickname }
  const [foundTeammates, setFoundTeammates] = useState([]); // foundTeammates: { docId, email, nickname }
  const [showProjectTypeSelect, setShowProjectTypeSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // modal

  // 팀 정보 가져오기
  useEffect(() => {
    setMyTeam({});
    setMyTeammates([]);
    async function fetchTeam() {
      try {
        const docRef = doc(firestore, "teams", teamDocId);
        const documentSnapshot = await getDoc(docRef); // 1. teamDocId에 해당하는 팀 가져오기
        const team = documentSnapshot.data(); // 해당 팀 정보
        const snap = await getDoc(doc(firestore, "users", team.leaderDocId)); // 2. 팀 리더의 docId로 유저 정보 가져오기
        const { nickname: leaderNickname } = snap.data(); // 팀 리더 닉네임
        const { teamName, leaderDocId, projectType, teamGit } = team;
        const temp = { teamName, leaderDocId, projectType, teamGit };
        setMyTeam({ ...temp, leaderNickname }); // 3. 팀 정보 갱신
        for (let teammateDocId of team.teammates) {
          const docRef = doc(firestore, "users", teammateDocId); // 팀원 docId와 일치하는 documentRef
          const docSnapshot = await getDoc(docRef); // 4. 팀원 docId로 해당 팀원 정보 가져오기
          const docId = docSnapshot.id; // 팀원의 docId
          const { nickname } = docSnapshot.data(); // 팀원의 닉네임
          setMyTeammates((prev) => [...prev, { docId, nickname }]); // 5. 팀원 리스트 갱신
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeam();
  }, [teamDocId]);

  // 팀명 변경 핸들러
  const updateTeamNameHandler = async (teamNameToUpdate) => {
    try {
      const teamsDocRef = doc(firestore, "teams", teamDocId); // teamDocId인 documenetReference
      await updateDoc(teamsDocRef, { teamName: teamNameToUpdate }); // 1. 수정된 팀 이름으로 적용
      const documentSnapshot = await getDoc(teamsDocRef); // 2. 팀명 변경된 teamDocId인 documentSnapshot 가져옴
      const { teamName } = documentSnapshot.data(); // 변경된 팀 이름
      setMyTeam((prev) => ({ ...prev, teamName })); // 3. myTeam 정보 업데이트
      setShowTeamNameInput(false); // 4. 팀명 변경 입력창 숨기기
      toast.success("팀명 변경 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 팀 삭제 핸들러
  const deleteTeamHandler = async () => {
    if (docId !== leaderDocId) return;
    const title = "정말로 팀을 삭제하시겠습니까?";
    const res = await MySwal.fire({ ...swalOptions, title });
    if (!res.isConfirmed) return;
    if (myTeammates.length > 0) {
      toast.warning("팀원이 있어 팀 삭제 불가");
      return;
    }
    try {
      await deleteDoc(doc(firestore, "teams", teamDocId)); // 1. 현재 팀 삭제하기
      const updateTeamsField = { teams: arrayRemove(teamDocId) };
      await updateDoc(doc(firestore, "users", docId), updateTeamsField); // 2. 팀 리더의 teams에서 현재 팀 삭제하기
      navigate("/teams", { replace: true });
      toast.success("팀 삭제 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 팀 탈퇴 핸들러
  const resignTeamHandler = async () => {
    if (docId === leaderDocId) return;
    const title = "정말로 팀에서 탈퇴하시겠습니까?";
    const res = await MySwal.fire({ ...swalOptions, title });
    if (!res.isConfirmed) return;
    try {
      const updateTeammatesField = { teammates: arrayRemove(docId) };
      await updateDoc(doc(firestore, "teams", teamDocId), updateTeammatesField); // 1. 현재 팀의 teammates 필드에서 본인 삭제하기
      const updateTeamsField = { teams: arrayRemove(teamDocId) };
      await updateDoc(doc(firestore, "users", docId), updateTeamsField); // 2. 해당 팀원의 teams 필드에서 현재 팀 삭제하기;
      navigate("/teams", { replace: true });
      toast.success("팀 탈퇴 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 팀원 검색 핸들러
  const findTeammateHandler = async (nicknameToFind) => {
    setFoundTeammates([]);
    try {
      const documentRef = collection(firestore, "users");
      const q = query(documentRef, where("nickname", "==", nicknameToFind));
      const querySnapshot = await getDocs(q); // 1. 검색한 닉네임에 해당하는 결과들 가져오기
      for (let document of querySnapshot.docs) {
        if (document.id === docId) continue; // 본인은 검색 시 나오지 않게
        const { nickname, email } = document.data();
        const foundTeammate = { docId: document.id, nickname, email };
        setFoundTeammates((prev) => [...prev, foundTeammate]); // 2. 해당 닉네임을 가진 팀원 추가
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 팀원 추가 핸들러
  const addTeammateHandler = async (teammateToAdd) => {
    const { docId: teammateDocId, nickname: teammateNickname } = teammateToAdd;
    if (teammateDocId === docId) return; // 본인을 팀원으로 추가할 수 없음
    const title = `${teammateNickname}님을 팀원으로 추가할까요?`;
    const res = await MySwal.fire({ ...swalOptions, title });
    if (!res.isConfirmed) return;
    if (
      myTeammates.filter((myTeammate) => myTeammate.docId === teammateDocId)
        .length > 0
    ) {
      setFoundTeammates([]);
      toast.warning("이미 추가된 팀원");
      return;
    }
    try {
      const updateTeammatesField = { teammates: arrayUnion(teammateDocId) };
      await updateDoc(doc(firestore, "teams", teamDocId), updateTeammatesField); // 1. 현재 팀의 teammates 필드에 팀원 추가하기
      const updateTeamsField = { teams: arrayUnion(teamDocId) };
      await updateDoc(doc(firestore, "users", teammateDocId), updateTeamsField); // 2. 해당 팀원의 teams 필드에 현재 팀 추가하기
      setMyTeammates((prev) => [...prev, teammateToAdd]);
      setFoundTeammates([]);

      // const documentRef = doc(firestore, "teams", teamDocId);
      // const documentSnapshot = await getDoc(documentRef); // 3. 갱신된 팀 document 가져오기
      // const {teammates} = documentSnapshot.data();
      // // myTeam: { teamName, leaderDocId, leaderNickname, projectType, teamGit }

      // // 4. myTeammates 갱신하기
      // setMyTeammates([]);
      // for (let teammateDocId of teammates) {
      //   const docRef = doc(firestore, "users", teammateDocId);
      //   const documentSnapshot = await getDoc(docRef);
      //   const { id: teammateDocId } = documentSnapshot;
      //   const { nickname: teammateNickname } = documentSnapshot.data();
      //   const newTeammate = { teammateDocId, teammateNickname };
      //   setMyTeammateList((prev) => [...prev, newTeammate]);
      // }
      toast.success("팀원 추가 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 팀원 삭제 핸들러
  const removeTeammateHandler = async (teammateToRemove) => {
    const { docId: teammateDocId, nickname: teammateNickname } =
      teammateToRemove;
    const title = `${teammateNickname}님을 팀에서 삭제하시겠습니까?`;
    const res = await MySwal.fire({ ...swalOptions, title });
    if (!res.isConfirmed) return;
    try {
      const updateTeammatesField = { teammates: arrayRemove(teammateDocId) };
      await updateDoc(doc(firestore, "teams", teamDocId), updateTeammatesField); // 1. 현재 팀의 teammates 필드에서 팀원 삭제하기
      const updateTeamsField = { teams: arrayRemove(teamDocId) };
      await updateDoc(doc(firestore, "users", teammateDocId), updateTeamsField); // 2. 해당 팀원의 teams 필드에서 현재 팀 삭제하기
      setMyTeammates((prev) => [
        ...prev.filter((myTeammate) => myTeammate.docId !== teammateDocId),
      ]);
      setFoundTeammates([]);

      // // 3. team 갱신하기
      // const teamsDocRef = doc(firestore, "teams", teamDocId);
      // const documentSnapshot = await getDoc(teamsDocRef);
      // const updatedTeam = documentSnapshot.data();
      // setMyTeam(updatedTeam);
      // // 4. myTeammateList 갱신하기 (teammates와 다름) <- 리팩토링 필요
      // setMyTeammateList([]);
      // const { teammates: teammatesFetched } = updatedTeam;
      // for (let teammateFetched of teammatesFetched) {
      //   const docRef = doc(firestore, "users", teammateFetched);
      //   const documentSnapshot = await getDoc(docRef);
      //   const { id: teammateDocId } = documentSnapshot;
      //   const { nickname: teammateNickname } = documentSnapshot.data();
      //   const newTeammate = { teammateDocId, teammateNickname };
      //   setMyTeammateList((prev) => [...prev, newTeammate]);
      // }
      toast.success("팀원 삭제 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 프로젝트 타입 변경 핸들러
  const updateProjectTypeHandler = async (projectTypeToUpdate) => {
    if (projectType === projectTypeToUpdate) {
      toast.warning("이전과 동일한 프로젝트 타입");
      setShowProjectTypeSelect(false);
      return;
    }
    try {
      const teamsDocRef = doc(firestore, "teams", teamDocId); // 팀명 변경과 동일
      await updateDoc(teamsDocRef, { projectType: projectTypeToUpdate }); // 팀명 변경과 동일
      const documentSnapshot = await getDoc(teamsDocRef); // 팀명 변경과 동일
      const { projectType } = documentSnapshot.data();
      setMyTeam((prev) => ({ ...prev, projectType }));
      toast.success("프로젝트 타입 변경 성공");
    } catch (error) {
      console.error(error);
    } finally {
      setShowProjectTypeSelect(false);
    }
  };

  return (
    <>
      {/* Team Detail */}
      <main
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
            isLeader={leaderDocId === docId}
            updateTeamName={updateTeamNameHandler}
            showTeamNameInput={showTeamNameInput}
            setShowTeamNameInput={setShowTeamNameInput}
            deleteTeam={deleteTeamHandler}
            resignTeam={resignTeamHandler}
          />

          {/* 팀장, 팀원, 팀 깃 주소, 프로젝트 타입 */}
          <TeamDetailMain
            leaderNickname={leaderNickname}
            isLeader={leaderDocId === docId}
            myTeammates={myTeammates}
            teamGit={teamGit}
            showProjectTypeSelect={showProjectTypeSelect}
            setShowProjectTypeSelect={setShowProjectTypeSelect}
            projectType={projectType}
            updateProjectType={updateProjectTypeHandler}
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
      </main>

      {/* 팀원 추가 모달 */}
      <AddTeammateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        findTeammate={findTeammateHandler}
        foundTeammates={foundTeammates}
        addTeammate={addTeammateHandler}
      />
    </>
  );
};

export default TeamDetail;
