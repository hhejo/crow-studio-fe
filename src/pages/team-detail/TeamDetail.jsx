import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  doc,
  collection,
  updateDoc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../../firebase";

import { getTeamDetail } from "../../redux/teamSlice";

import teamApi from "../../api/teamApi";

import Header from "../../components/Header";
import TeamDetailHeader from "./TeamDetailHeader";
import TeamDetailMain from "./TeamDetailMain";
import AddUserModal from "./components/AddUserModal";

// MySwal.fire SweetAlert 옵션
const alertOption = {
  showCancelButton: true,
  confirmButtonText: "네",
  cancelButtonText: "아니오",
  background: "#3C3C3C",
};

const TeamDetail = () => {
  const [dispatch, navigate] = [useDispatch(), useNavigate()];
  const { teamUid } = useParams();
  const { uid } = useSelector((state) => state.user.value);
  const MySwal = withReactContent(Swal);
  const [team, setTeam] = useState({});
  const { teamName, leaderNickname, leaderUid, members, projectType, teamGit } =
    team;

  // const [searchUserName, setSearchUserName] = useState("");
  const [enteredUserNickname, setEnteredUserNickname] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [showModifyProjectTypeSelect, setShowModifyProjectTypeSelect] =
    useState(false);
  const [showModifyTeamNameInput, setShowModifyTeamNameInput] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const documentSnapshot = await getDoc(doc(firestore, "teams", teamUid));
        setTeam(documentSnapshot.data());
      } catch (err) {
        console.error(err);
        // 404: navigate("/404", { replace: true })
        // 403: navigate("/403", { replace: true })
      }
    }
    fetchTeam();
  }, [teamUid]);

  // 팀명 수정
  const modifyTeamNameHandler = async (modifiedTeamName) => {
    try {
      const docRef = doc(firestore, "teams", teamUid);
      await updateDoc(docRef, { teamName: modifiedTeamName });
      const documentSnapshot = await getDoc(docRef);
      setTeam(documentSnapshot.data());
      setShowModifyTeamNameInput(false);
      toast.success("팀명을 성공적으로 변경했습니다");
    } catch (err) {
      console.error(err);
      // 409: 이미 같은 팀 이름이 존재합니다
      // 404: navigate("/404", { replace: true })
      // 403: navigate("/403", { replace: true })
    }
  };

  // 팀 삭제
  const deleteTeamHandler = async () => {
    if (uid !== leaderUid) return;
    // 팀원 있으면 삭제 불가하게 하기 ?
    const alertTitle = "정말로 팀을 삭제하시겠습니까?";
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;

    console.log("teamUid:", teamUid);
    console.log("team:", team);
    // team.members 배열에 있는 모든 유저들 각각에 작업
    // memberUid에 대해 유저 teams에 현재 팀 삭제
    // memberUid도 삭제
    // leaderUid에 대해 유저 teams에 현재 팀 삭제
    // 현재 teamUid에 해당하는 팀 삭제

    // try {
    //   await teamApi.deleteTeam(teamUid);
    //   navigate("/teams");
    //   toast.success("팀 삭제 성공");
    // } catch (err) {
    //   toast.error("Error");
    // }
  };

  // 팀 탈퇴
  const resignTeamHandler = async () => {
    if (uid === leaderUid) return;
    const alertTitle = "정말로 팀에서 탈퇴하시겠습니까?";
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    // try {
    //   await teamApi.resignTeam(teamUid);
    //   navigate("/teams");
    //   toast.success("팀 탈퇴 성공");
    // } catch (err) {
    //   toast.error("Error");
    // }
  };

  const searchUserHandler = async (userNickname) => {
    setSearchResults([]);
    const documentRef = collection(firestore, "users");
    const q = query(documentRef, where("nickname", "==", userNickname));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { uid, nickname } = doc.data();
      const res = { uid, nickname, userDocId: doc.id };
      setSearchResults((prev) => [...prev, res]);
    });
  };

  const addUserHandler = async (addUserUid, addUserDocId, addUserNickname) => {
    const alertTitle = `${addUserNickname}님을 팀원으로 추가할까요?`;
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    console.log(team);
    return;
    try {
      // const { id: teamUid } = await addDoc(collection(firestore, "teams"), newTeam);
      const updateField = { members: arrayUnion(addUserUid) };
      await updateDoc(doc(firestore, "teams", teamUid), updateField);
      const updateField2 = { teams: arrayUnion(addUserDocId) };
      await updateDoc(doc(firestore, "users", addUserDocId), updateField2);
      // const documentRef = collection(firestore, "users");
      // const q = query(documentRef, where("uid", "==", addUserUid));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((document) => {
      //   const updateField2 = { teams: arrayUnion(teamUid) };
      //   updateDoc(doc(firestore, "users", document.id), updateField2);
      // });
    } catch (err) {
      console.error(err);
    }
    // const addMemberData = { teamUid, memberSeq: addUserSeq };
    // try {
    //   await teamApi.addMember(addMemberData);
    //   setSearchResults([]);
    //   const res = await dispatch(getTeamDetail(teamUid)).unwrap();
    //   setTeam(res);
    //   toast.success("팀원 추가 성공");
    // } catch (err) {
    //   if (err.response.status === 409) toast.warning("이미 추가된 팀원입니다");
    //   else toast.error("Error");
    // }
  };

  const deleteMemberHandler = async (memberNickname, memberSeq) => {
    const alertTitle = `${memberNickname}님을 팀에서 삭제하시겠습니까?`;
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) {
      return;
    }
    const deleteMemberData = { teamUid, memberSeq };
    try {
      await teamApi.deleteMember(deleteMemberData);
      const res = await dispatch(getTeamDetail(teamUid)).unwrap();
      setTeam(res);
      toast.success("팀원 삭제 성공");
    } catch (err) {
      toast.error("Error");
    }
  };

  // 프로젝트 타입 변경
  const modifyProjectType = async (modifiedProjectType) => {
    if (projectType === modifiedProjectType) {
      toast.warning("변경하려는 프로젝트 타입이 이전과 동일합니다");
      setShowModifyProjectTypeSelect(false);
      return;
    }
    try {
      const docRef = doc(firestore, "teams", teamUid);
      await updateDoc(docRef, { projectType: modifiedProjectType });
      const documentSnapshot = await getDoc(docRef);
      setTeam(documentSnapshot.data());
      toast.success("프로젝트 타입을 성공적으로 변경했습니다");
    } catch (err) {
      console.error(err);
      // 401: JWT가 없거나 틀림
      // 403: Forbidden
      // 404: Not Found
    } finally {
      setShowModifyProjectTypeSelect(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* 헤더 */}
      <Header />

      {/* 팀원 추가 모달 */}
      <AddUserModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        enteredUserNickname={enteredUserNickname}
        setEnteredUserNickname={setEnteredUserNickname}
        searchUser={searchUserHandler}
        searchResults={searchResults}
        addUser={addUserHandler}
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
            members={members}
            teamGit={teamGit}
            //
            showModifyProjectTypeSelect={showModifyProjectTypeSelect}
            setShowModifyProjectTypeSelect={setShowModifyProjectTypeSelect}
            projectType={projectType}
            modifyProjectType={modifyProjectType}
            //
            deleteMemberHandler={deleteMemberHandler}
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
              onClick={() => navigate(`/project/${teamUid}`)}
              className="w-40 h-12 text-lg font-bold bg-point_purple text-component_dark hover:bg-point_purple_-2 hover:text-white rounded-md transition"
            >
              프로젝트로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
