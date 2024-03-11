import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import SplitPane from "react-split-pane";
import { TiArrowRightThick } from "react-icons/ti";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";
import Sidebar from "./components/sidebar/Sidebar";
import VariableName from "./components/sidebar/VariableName";
import ConsoleTerminal from "./components/ConsoleTerminal";
import { Nav } from "../../components/Nav";

const Intro = () => {
  const dispatch = useDispatch();
  const { teamSeq } = useParams();
  const { selectedFileName, selectedFileType, selectedFilePath } = useSelector(
    (state) => state.team.value
  );
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
    editors: { fontSize: 14, font: "Monospace", autoLine: true },
    consoles: { fontSize: 14, font: "Monospace" },
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
    // userApi
    //   .getUnLogin()
    //   .then((res) => setUnLoginSession(res.data))
    //   .catch(() => toast.error("Error"));
  }, []);

  // 개인 환경 세팅 저장
  const saveSetting = async () => {
    userApi.setPersonalSetting(teamSeq, setting);
  };

  // 사이드바 아이콘 눌러서 해당 컴포넌트 보여주기
  const showComponentHandler = (componentName) => {
    setSetting((prev) => {
      return { ...prev, lastSideBar: componentName };
    });
    saveSetting();
  };

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
    <main className="flex mx-3" style={{ height: "calc(100% - 80px)" }}>
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
    </main>
  );
};

export default Intro;

const SidebarItems = styled.div`
  width: 292px;
  min-width: 0px;
  height: 100%;
  margin-left: 3px;
`;
