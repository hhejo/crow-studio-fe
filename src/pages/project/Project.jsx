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
import Team from "./components/sidebar/Team";
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
  const [selected, setSelected] = useState(initialSelected); // 디렉토리에서 선택된 파일이나 폴더
  const [lastClickedSidebarIcon, setLastClickedSidebarIcon] = useState("Dir"); // 마지막으로 선택된 사이드바 아이콘
  const [team, setTeam] = useState({}); // 현재 팀 정보
  const [teammateList, setTeammateList] = useState([]); // 현재 팀의 팀원 리스트
  // const { teamName, leaderNickname, leaderUid, teammates, projectType, teamGit } = team;

  // const { teamGit } = useSelector((state) => state.team.value);
  const { docId } = useSelector((state) => state.user.value);
  const { loading } = useSelector((state) => state.global.value);
  // const [lintResultList, setLintResultList] = useState([]);
  const [setting, setSetting] = useState(initialSetting);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const docRef = doc(firestore, "teams", teamDocId);
        const documentSnapshot = await getDoc(docRef);
        const teamFetched = documentSnapshot.data();
        setTeam(teamFetched);
        const { teammates: teammatesFetched } = teamFetched;
        setTeammateList([]);
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
    // // 초기 팀 정보 가져옴
    // dispatch(getTeamDetail(teamDocId))
    //   .unwrap()
    //   .then(() => editorRef.current?.getModel().setValue(""))
    //   .catch((errStatusCode) => {
    //     console.error("errStatusCode:", errStatusCode);
    //     if (errStatusCode === 404) navigate("/404", { replace: true });
    //     else if (errStatusCode === 403) navigate("/403", { replace: true });
    //   });
    // // 개인 환경 세팅 불러오기
    // userApi
    //   .getPersonalSetting(teamDocId)
    //   .then((res) => {
    //     if (res.data.result.includes("SUCCESS")) setSetting(() => res.data);
    //     else userApi.setPersonalSetting(teamDocId, setting);
    //   })
    //   .catch((err) => console.error(err));
  }, [teamDocId]);

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
    <div className="flex mx-3" style={{ height: "calc(100% - 80px)" }}>
      {/* 왼쪽 */}
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
                team={team}
                teammateList={teammateList}
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
    </div>
  );
};

export default Project;
