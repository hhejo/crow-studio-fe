// React, Router, Redux
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// Firebase
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
// Slice
import { startLoading, stopLoading } from "../../redux/global-slice";
// Toast
import { toast } from "react-toastify";
// Components
import SidebarIconsContainer from "./components/sidebar/SidebarIconsContainer";
import Directory from "./components/sidebar/Directory";
import Git from "./components/sidebar/Git";
import { Team } from "./components/Team";
import Api from "./components/sidebar/Api";
import VariableName from "./components/sidebar/VariableName";
import Settings from "./components/sidebar/Settings";
import { ProjectContent } from "./ProjectContent";

const initialSetting = {
  horizonSplit: 50,
  editors: { fontSize: 14, font: "Monospace", autoLine: true },
  consoles: { fontSize: 14, font: "Monospace" },
  lastTab: [],
  // lastSideBar: "Dir",
};

const initialSelected = { fileName: "", fileType: "", filePath: "" };

const Project = () => {
  const navigate = useNavigate();
  const { teamDocId } = useParams();
  const { docId } = useSelector((state) => state.user.value);
  const [myTeam, setMyTeam] = useState({}); // myTeam: { teamName, leaderDocId, leaderNickname, projectType, teamGit }
  // const { teamName, leaderDocId, leaderNickname, projectType, teamGit } = myTeam;
  const [myTeammates, setMyTeammates] = useState([]); // myTeammate: { docId, nickname, email }
  const [selected, setSelected] = useState(initialSelected); // 디렉토리에서 선택된 파일이나 폴더
  const [lastClickedSidebarIcon, setLastClickedSidebarIcon] = useState("Dir"); // 마지막으로 선택된 사이드바 아이콘

  const { loading } = useSelector((state) => state.global.value);
  // const [lintResultList, setLintResultList] = useState([]);
  const [setting, setSetting] = useState(initialSetting);

  // 팀 정보 가져오기
  useEffect(() => {
    setMyTeam({});
    setMyTeammates([]);
    async function fetchTeam() {
      try {
        const docRef = doc(firestore, "teams", teamDocId); // 팀 docId와 일치하는 documentRef
        const documentSnapshot = await getDoc(docRef); // 1. teamDocId에 해당하는 팀 가져오기
        const team = documentSnapshot.data(); // 해당 팀 정보
        const snap = await getDoc(doc(firestore, "users", team.leaderDocId)); // 2. 팀 리더의 docId로 유저 정보 가져오기
        const { nickname: leaderNickname } = snap.data(); // 팀 리더 닉네임
        const { teamName, leaderDocId, projectType, teamGit } = team;
        const temp = { teamName, leaderDocId, projectType, teamGit };
        setMyTeam({ ...temp, leaderNickname }); // 3. 팀 정보 갱신
        for (let teammateDocId of team.teammates) {
          const docRef = doc(firestore, "users", teammateDocId); // 팀원 docId와 일치하는 documentRef
          const docSnap = await getDoc(docRef); // 4. 팀원 docId로 해당 팀원 정보 가져오기
          const [docId, { nickname, email }] = [docSnap.id, docSnap.data()]; // 팀원의 docId, 닉네임, 이메일
          setMyTeammates((prev) => [...prev, { docId, nickname, email }]); // 5. 팀원 리스트 갱신
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeam();
  }, [teamDocId]);

  // useEffect(() => {
  //   // // 개인 환경 세팅 불러오기
  //   // userApi
  //   //   .getPersonalSetting(teamDocId)
  //   //   .then((res) => {
  //   //     if (res.data.result.includes("SUCCESS")) setSetting(() => res.data);
  //   //     else userApi.setPersonalSetting(teamDocId, setting);
  //   //   })
  //   //   .catch((err) => console.error(err));
  // }, [teamDocId]);

  // 개인 환경 세팅 저장
  const saveSetting = () => {
    console.log("saveSetting");
    // userApi
    //   .setPersonalSetting(teamDocId, setting)
    //   .then(() => toast.success("저장되었습니다"))
    //   .catch(() => toast.error("!! 오류가 발생했습니다"));
  };

  // // 파일, 폴더 클릭할 때마다 리렌더링, 파일이면 해당 내용 서버에서 받아와 에디터에 출력
  // useEffect(() => {
  //   (async () => {
  //     if (selectedFileType.length > 0 && selectedFileType !== "folder") {
  //       try {
  //         const filePathData = { filePath: selectedFilePath };
  //         const res = await fileApi.getFileContent(filePathData);
  //         editorRef.current.getModel().setValue(res.data.fileContent);
  //         setSetting((prev) => { return { ...prev, lastTab: [filePathData] } });
  //         saveSetting();
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   })();
  // }, [dispatch, selectedFileName, selectedFileType, selectedFilePath, lintResultList, compiledOutputList]);

  // 사이드바 아이콘 눌러서 해당 아이콘 내용 보여주고 활성화된 아이콘 한 번 더 누르면 해당 아이콘의 내용 접기
  const showIconContentHandler = (clickedIconName) => {
    setLastClickedSidebarIcon(clickedIconName);
    saveSetting();
  };

  // 파일 저장
  const saveFileContentHandler = async () => {
    // if (selectedFileType === "folder") return;
    // try {
    //   // 1. 파일 포맷 요청
    //   const beforeFormatData = { text: editorRef.current.getValue() };
    //   dispatch(startLoading());
    //   const res1 = await editorApi.sendFormatRequest(
    //     "python",
    //     beforeFormatData
    //   );
    //   // 2. 파일 포맷 결과 받기
    //   const formatTicketData = { name: res1.data.data };
    //   const res2 = await editorApi.getFormatResult("python", formatTicketData);
    //   // 3. 파일 저장
    //   const fileContentData = {
    //     filePath: selectedFilePath,
    //     fileContent: res2.data.data,
    //   };
    //   await fileApi.saveFileContent(teamDocId, fileContentData);
    //   // 린트
    //   setLintResultList([]);
    //   const textCodeData = { text: fileContentData.fileContent };
    //   const res = await editorApi.lint("python", textCodeData);
    //   const warnings = res.data.data;
    //   const indexes = res.data.index;
    //   setLintResultList(
    //     warnings.map((warning, i) => `Line ${indexes[i]}: ${warning}`)
    //   );
    //   // 여기도!!
    //   setCompiledOutputList(
    //     warnings.map((warning, i) => `Line ${indexes[i]}: ${warning}`)
    //   ); // 여기도!!
    //   // 4. 파일 내용 가져오기
    //   const filePathData = { filePath: selectedFilePath };
    //   const res3 = await fileApi.getFileContent(filePathData);
    //   editorRef.current.getModel().setValue(res3.data.fileContent);
    //   dispatch(stopLoading());
    //   toast.success("파일 저장 성공");
    // } catch (err) {
    //   dispatch(stopLoading());
    //   toast.error("파일 저장 실패");
    // }
  };

  // 동시 편집 파트로 이동
  const goCodeShare = () => {
    saveSetting();
    navigate("/project/code-share", {
      state: { teamDocId, options: setting.editors },
      target: "_blank",
      rel: "noopener noreferrer",
    });
    window.location.reload();
  };

  return (
    <main className="flex mx-3" style={{ height: "calc(100% - 80px)" }}>
      {/* 왼쪽 사이드바 아이콘, 내용 */}
      <div className="flex">
        {/* 사이드바 아이콘 모음 */}
        <SidebarIconsContainer
          clickIcon={showIconContentHandler}
          lastClickedSidebarIcon={lastClickedSidebarIcon}
          goCodeShare={goCodeShare}
        />

        {/* 아이콘 클릭 시 내용 */}
        {lastClickedSidebarIcon && lastClickedSidebarIcon !== "Share" && (
          <div style={{ width: "292px", height: "100%", marginLeft: "3px" }}>
            {/* 디렉토리 */}
            {lastClickedSidebarIcon === "Dir" && (
              <Directory
                teamDocId={teamDocId}
                selected={selected}
                setSelected={setSelected}
                saveFileContent={saveFileContentHandler}
                loading={loading}
                // editorRef={editorRef}
              />
            )}

            {/* 깃 */}
            {lastClickedSidebarIcon === "Git" && (
              <Git
                // selectedFilePath={selectedFilePath}
                // selectedFilePath={selectedFile.filePath}
                teamDocId={teamDocId}
                docId={docId}
              />
            )}

            {/* 팀 */}
            {lastClickedSidebarIcon === "Team" && (
              <Team
                teamDocId={teamDocId}
                myTeam={myTeam}
                myTeammates={myTeammates}
              />
            )}

            {/* API */}
            {lastClickedSidebarIcon === "Api" && <Api />}

            {/* 변수명 추천 */}
            {lastClickedSidebarIcon === "Var" && <VariableName />}

            {/* 환경설정 */}
            {lastClickedSidebarIcon === "Set" && (
              <Settings
                setting={setting}
                setSetting={setSetting}
                saveSetting={saveSetting}
              />
            )}
          </div>
        )}
      </div>

      {/* 오른쪽 에디터, 콘솔 터미널 */}
      <ProjectContent
        lastClickedSidebarIcon={lastClickedSidebarIcon}
        setting={setting}
        setSetting={setSetting}
        selectedFilePath={selected.filePath}
      />
    </main>
  );
};

export default Project;
