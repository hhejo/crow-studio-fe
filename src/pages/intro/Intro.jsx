import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import SplitPane from "react-split-pane";

import { TiArrowRightThick } from "react-icons/ti";

import { startLoading, endLoading } from "../../redux/globalSlice";

import fileApi from "../../api/fileApi";
import editorApi from "../../api/editorApi";
import userApi from "../../api/userApi";

import Header from "../../components/Header";
import Sidebar from "./components/sidebar/Sidebar";
import VariableName from "./components/sidebar/VariableName";

import ConsoleTerminal from "./components/ConsoleTerminal";
import { toast } from "react-toastify";

const Intro = () => {
  const dispatch = useDispatch();
  const { teamSeq } = useParams();
  // const { teamGit } = useSelector((state) => state.team.value);
  const { selectedFileName, selectedFileType, selectedFilePath } = useSelector(
    (state) => state.team.value
  );
  const isLoading = useSelector((state) => state.global.value.isLoading);
  // const [showComponent, setShowComponent] = useState("Dir");
  const [lintResultList, setLintResultList] = useState([]);

  const [unLoginSession, setUnLoginSession] = useState("");

  const editorRef = useRef(null); // 에디터 내용
  const editorheightRef = useRef(); // 에디터 높이
  const [editorHeight, setEditorHeight] = useState();
  const [consoleHeight, setConsoleHeight] = useState("");

  const [setting, setSetting] = useState({
    horizonSplit: 50,
    lastTab: [],
    lastSideBar: "Var",
    editors: {
      fontSize: 14,
      font: "Monospace",
      autoLine: true,
    },
    consoles: {
      fontSize: 14,
      font: "Monospace",
    },
  });

  const editorOptions = {
    scrollBeyondLastLine: false,
    fontSize: "20px",
    fontFamily: setting.editors.font,
    autoIndent: "advanced",
    wrappingIndent: "same",
    automaticLayout: true,
    wordWrap: setting.editors.autoLine,
  };

  const firstEditorValue = `# Welcome to Golden Crow!\n# Insert your Python code here.\n`;

  useEffect(() => {
    userApi
      .getUnLogin()
      .then((res) => setUnLoginSession(res.data))
      .catch(() => toast.error("Error"));
  }, []);

  // 개인 환경 세팅 저장
  const saveSetting = async () => {
    userApi.setPersonalSetting(teamSeq, setting);
  };

  // // 파일, 폴더 클릭할 때마다 리렌더링, 파일이면 해당 내용 서버에서 받아와 에디터에 출력
  // useEffect(() => {
  //   (async () => {
  //     // if (selectedFileType.length > 0 && selectedFileType !== "directory") {
  //     if (selectedFileType.length > 0 && selectedFileType !== "folder") {
  //       try {
  //         const filePathData = { filePath: selectedFilePath };
  //         const res = await fileApi.getFileContent(filePathData);
  //         editorRef.current.getModel().setValue(res.data.fileContent);
  //         setSetting((prev) => {
  //           return { ...prev, lastTab: [filePathData] };
  //         });
  //         saveSetting();
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   })();
  // }, [
  //   dispatch,
  //   selectedFileName,
  //   selectedFileType,
  //   selectedFilePath,
  //   lintResultList,
  // ]);

  // 사이드바 아이콘 눌러서 해당 컴포넌트 보여주기
  const showComponentHandler = (componentName) => {
    setSetting((prev) => {
      return { ...prev, lastSideBar: componentName };
    });
    saveSetting();
  };

  // // 파일 저장
  // const unLoginRunCompileHandler = async () => {
  //   console.log("helo");
  //   try {
  //     // 1. 파일 포맷 요청
  //     const beforeFormatData = { text: editorRef.current.getValue() };
  //     dispatch(startLoading());
  //     const res1 = await editorApi.sendFormatRequest(
  //       "python",
  //       beforeFormatData
  //     );
  //     // 2. 파일 포맷 결과 받기
  //     const formatTicketData = { name: res1.data.data };
  //     const res2 = await editorApi.getFormatResult("python", formatTicketData);
  //     // 3. 파일 저장
  //     const fileContentData = {
  //       filePath: selectedFilePath,
  //       fileContent: res2.data.data,
  //     };
  //     await fileApi.saveFileContent(teamSeq, fileContentData);

  //     // 린트
  //     setLintResultList([]);
  //     const textCodeData = { text: fileContentData.fileContent };
  //     const res = await editorApi.lint("python", textCodeData);
  //     const warnings = res.data.data;
  //     const indexes = res.data.index;
  //     setLintResultList(
  //       warnings.map((warning, i) => `Line ${indexes[i]}: ${warning}`)
  //     );

  //     // 4. 파일 내용 가져오기
  //     const filePathData = { filePath: selectedFilePath };
  //     const res3 = await fileApi.getFileContent(filePathData);
  //     editorRef.current.getModel().setValue(res3.data.fileContent);
  //     dispatch(endLoading());
  //     toast.success("파일 저장 성공");
  //   } catch (err) {
  //     dispatch(endLoading());
  //     toast.error("파일 저장 실패");
  //   }
  // };

  // 콘솔 높이 초기값 세팅
  useEffect(() => {
    const tempSize2 = editorheightRef.current.pane2.clientHeight - 0.5;
    setConsoleHeight(tempSize2);
    const tempSize = editorheightRef.current.pane1.clientHeight - 34;
    setEditorHeight(tempSize);
  }, []);

  // 브라우저 사이즈 변경할 때 에디터와 콘솔 높이 변경
  const handleResize = () => {
    // 에디터 높이 변경값 셋
    const tempSize1 = editorheightRef.current.pane1.clientHeight - 34;
    setEditorHeight(tempSize1);
    // 콘솔 높이 변경값 셋
    const tempSize2 = editorheightRef.current.pane2.clientHeight - 0.5;
    setConsoleHeight(tempSize2);
  };

  // 브라우저 사이즈 변경 감지
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // 메모리 누수 방지?
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const checkSize = () => {
    // 에디터 높이 변경값 셋
    const tempSize = editorheightRef.current.state.pane1Size;
    console.log(tempSize);
    const offsetSize = editorheightRef.current.splitPane.clientHeight;
    setSetting((prev) => {
      return {
        ...prev,
        horizonSplit: parseInt((tempSize / offsetSize) * 100),
      };
    });
    const tempSize1 = editorheightRef.current.pane1.clientHeight - 34;
    setEditorHeight(tempSize1);
    // 콘솔 높이 변경값 셋
    const tempSize2 = editorheightRef.current.pane2.clientHeight - 0.5;
    setConsoleHeight(tempSize2);
  };

  return (
    <React.Fragment>
      <div className="h-full w-full">
        <Header />
        <div className="flex mx-3" style={{ height: "calc(100% - 80px)" }}>
          <div className="flex">
            <Sidebar
              clickIcon={showComponentHandler}
              showComponent={setting.lastSideBar}
            />
            {setting.lastSideBar && (
              <SidebarItems>
                {setting.lastSideBar === "Var" && <VariableName />}
              </SidebarItems>
            )}
          </div>
          <div
            className="flex flex-col ml-[8px] h-full"
            style={
              setting.lastSideBar === ""
                ? { width: "calc(100vw - 105px)" }
                : { width: "calc(100vw - 400px)" }
            }
          >
            <SplitPane
              style={{ position: "static", height: "auto" }}
              split="horizontal"
              minSize={30}
              maxSize={-30}
              defaultSize={setting.horizonSplit + "%"}
              className="vertical Pane1"
              ref={editorheightRef}
              onDragFinished={checkSize}
            >
              <div className="w-full">
                <div className="text-sm flex items-center bg-component_item_bg_dark p-1 rounded-lg mb-1.5">
                  <TiArrowRightThick className="text-point_yellow" />
                  <div className="ml-2 break-all">
                    {selectedFilePath?.split("/").slice(1).join("/")}
                  </div>
                </div>
                <Editor
                  style={{
                    overflow: "auto",
                  }}
                  height={editorHeight}
                  theme="vs-dark"
                  defaultLanguage="python"
                  defaultValue={firstEditorValue}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                  options={editorOptions}
                />
              </div>
              <ConsoleTerminal
                teamSeq={teamSeq}
                selectedFilePath={selectedFilePath}
                consoleHeight={consoleHeight}
                lintResultList={lintResultList}
                setLintResultList={setLintResultList}
                setting={setting.consoles}
                editorRef={editorRef}
              />
            </SplitPane>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Intro;

const SidebarItems = styled.div`
  width: 292px;
  min-width: 0px;
  height: 100%;
  margin-left: 3px;
`;
