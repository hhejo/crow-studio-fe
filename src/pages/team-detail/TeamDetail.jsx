import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactTooltip from "react-tooltip";

import { getTeamDetail, modifyProjectType } from "../../redux/teamSlice";
import { searchUser } from "../../redux/user-slice";

import teamApi from "../../api/teamApi";

import Header from "../../components/Header";
import TeamDetailHeader from "./components/TeamDetailHeader";
import Leader from "./components/Leader";
import Member from "./components/Member";

import Modal from "react-modal";

import { IoAdd, IoClose } from "react-icons/io5";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

import { ProjectTypeSelect } from "../../components/ProjectTypeSelect";

// modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "auto",
    height: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    backgroundColor: "#3C3C3C",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

// headlist listbox items
const pjtType = [
  { name: "pure Python" },
  { name: "Django" },
  { name: "Flask" },
  { name: "FastAPI" },
];

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
  const [projectTypeInput, setProjectTypeInput] = useState(false);
  const [modifiedProjectType, setModifiedProjectType] = useState(projectType);
  const [searchUserName, setSearchUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [showModifyTeamNameInput, setShowModifyTeamNameInput] = useState(false);

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
    // 팀원 있으면 삭제 불가하게 하기 ?
    const alertTitle = "정말로 팀을 삭제하시겠습니까?";
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
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

  const searchUserChangeHandler = (e) => setSearchUserName(e.target.value);

  const submitSearchUserHandler = (e) => {
    e.preventDefault();
    if (searchUserName.trim().length === 0) {
      return;
    }
    const searchData = { searchWord: searchUserName };
    dispatch(searchUser(searchData))
      .unwrap()
      .then(setSearchResults)
      .catch(console.error);
  };

  const addUserHandler = async (addUserSeq, addUserName) => {
    const alertTitle = `${addUserName}님을 팀원으로 추가할까요?`;
    const res = await MySwal.fire({ ...alertOption, title: alertTitle });
    if (!res.isConfirmed) return;
    const addMemberData = { teamUid, memberSeq: addUserSeq };
    try {
      await teamApi.addMember(addMemberData);
      setSearchResults([]);
      const res = await dispatch(getTeamDetail(teamUid)).unwrap();
      setTeam(res);
      toast.success("팀원 추가 성공");
    } catch (err) {
      if (err.response.status === 409) toast.warning("이미 추가된 팀원입니다");
      else toast.error("Error");
    }
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

  // Modal
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#fff";
  }
  function closeModal() {
    setIsOpen(false);
  }

  // modify project listbox
  const [selected, setSelected] = useState(pjtType[0]);

  const listboxChangeHandler = (e) => {
    setSelected(e);
    modifyProjectTypeHandler(e);
  };

  const modifyProjectTypeHandler = (e) => {
    setModifiedProjectType(e.name);
    submitProjectTypeHandler(e);
  };

  const submitProjectTypeHandler = (e) => {
    e.preventDefault();
    const modifiedData = { projectType: modifiedProjectType };
    dispatch(modifyProjectType({ teamUid, modifiedData }))
      .unwrap()
      .then((res) => {
        console.log(res);
        setProjectTypeInput(false);
        dispatch(getTeamDetail(teamUid))
          .unwrap()
          .then((res) => {
            setTeam(res);
            console.log("res:", res);
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* 헤더 */}
      <Header />

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-white font-bold"
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            팀원 추가
          </h2>
          <IoClose
            className="cursor-pointer text-primary_dark text-xl ml-2"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm mr-2">유저검색</div>
            <form onSubmit={submitSearchUserHandler}>
              <input
                type="text"
                name="searchUser"
                id="searchUser"
                onChange={searchUserChangeHandler}
                value={searchUserName}
                className="rounded-md bg-component_item_bg_+2_dark px-4 py-1 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
              />
            </form>
          </div>
          <div>
            <div className="text-point_purple_op20 text-xs ml-14 mb-1">
              닉네임을 누르면 해당 유저가 팀에 추가됩니다.
            </div>
            {searchResults?.map((user) => (
              <div
                key={user.userId}
                className="hover:cursor-pointer px-4 py-1 text-sm font-bold ml-14 rounded-md text-point_yellow hover:bg-point_yellow_+2 hover:text-black"
                onClick={() => addUserHandler(user.userSeq, user.userNickname)}
              >
                {user.userNickname}
              </div>
            ))}
          </div>
        </div>
      </Modal>

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
          <>
            {/* 팀장 */}
            <div className="flex items-center mb-2 md:w-full w-[285px] h-fit bg-component_item_bg_dark rounded-md">
              <div className="md:w-48 w-32 text-white font-bold bg-point_purple_op20 h-full p-2 flex items-center rounded-bl-md rounded-tl-md">
                팀장
              </div>
              <Leader teamLeaderNickname={leaderNickname} />
            </div>

            {/* 팀원 */}
            <div className="flex mb-2 md:w-full w-[285px] bg-component_item_bg_dark rounded-md">
              <div className="md:w-48 w-32 bg-point_purple_op20 p-2 flex items-center rounded-bl-md rounded-tl-md">
                <span className="text-white font-bold">팀원</span>
                <span className="text-point_light_yellow text-xs font-semibold mr-2 px-1.5 py-0.5 rounded">
                  {members?.length}
                </span>
              </div>

              <div className="flex md:flex-row flex-col justify-center items-center">
                {members?.length === 0 && (
                  <div className="text-sm flex items-center py-2 pl-2">
                    팀원을 추가
                  </div>
                )}
                {members?.map((member) => (
                  <Member
                    key={`m${member.memberSeq}`}
                    isLeader={leaderUid === uid}
                    memberNickname={member.memberNickname}
                    memberSeq={member.memberSeq}
                    deleteMember={deleteMemberHandler}
                  />
                ))}
                <div className="flex flex-col items-center px-2 py-2">
                  {leaderUid === uid && (
                    <div>
                      <IoAdd
                        className="text-white cursor-pointer text-lg hover:text-point_yellow hover:scale-125 transition"
                        onClick={openModal}
                        data-tip="팀원 추가"
                      />
                      <ReactTooltip place="right" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 팀 깃 주소 */}
            <div className="flex mb-2 md:w-full w-[285px] bg-component_item_bg_dark rounded-md">
              <div className="md:w-48 w-32 min-w-[128px] text-white font-bold bg-point_purple_op20 p-2 flex items-center rounded-bl-md rounded-tl-md">
                깃 주소
              </div>
              <div className="flex">
                <div className="text-white text-sm break-all p-2">
                  {teamGit ? teamGit : "-"}
                </div>
              </div>
            </div>

            {/* 프로젝트 타입 */}
            <div className="flex mb-4 md:w-full w-[285px] bg-component_item_bg_dark rounded-md">
              <div className="md:w-48 w-32 text-white font-bold bg-point_purple_op20 p-2 flex items-center rounded-bl-md rounded-tl-md">
                프로젝트 타입
              </div>
              <div className="flex">
                <div className="text-white text-sm p-2">
                  {!projectTypeInput && (
                    <div className="flex items-center">
                      <span>{projectType}</span>
                      {leaderUid === uid && (
                        <BsPencilFill
                          className="ml-3 text-sm text-point_yellow_+2 cursor-pointer hover:text-point_yellow hover:scale-125 transition"
                          onClick={() => setProjectTypeInput(true)}
                          data-tip="프로젝트 타입 변경"
                        />
                      )}
                    </div>
                  )}
                  {projectTypeInput && (
                    <div className="w-full flex justify-start">
                      <div className="md:w-72 w-[115px]">
                        <ProjectTypeSelect
                          selected={selected}
                          onChange={listboxChangeHandler}
                          pjtType={pjtType}
                        />
                      </div>
                      <button
                        className="ml-2"
                        onClick={submitProjectTypeHandler}
                      >
                        <BsCheckLg className="text-point_light_yellow hover:text-point_yellow" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>

          {/* 버튼 2개 */}
          <div className="w-full flex justify-end gap-4">
            {/* 팀 목록 이동 버튼 */}
            <button
              onClick={() => navigate("/teams")}
              className="w-40 h-12 text-lg font-bold text-primary_dark bg-component_item_bg_dark border border-primary_-2_dark hover:bg-component_item_bg_+2_dark hover:text-white rounded-md transition"
            >
              팀 목록
            </button>

            {/* 프로젝트 이동 버튼 */}
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
