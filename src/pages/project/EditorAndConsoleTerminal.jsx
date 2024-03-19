import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import SplitPane from "react-split-pane";
import { TiArrowRightThick } from "react-icons/ti";

import ConsoleTerminal from "./components/ConsoleTerminal";

const EditorAndConsoleTerminal = (props) => {
  const { lastClickedSidebarIcon, selectedFilePath } = props;
  const { setting, setSetting } = props;
  const editorRef = useRef(null); // 에디터 내용
  const editorHeightRef = useRef(); // 에디터 높이 Ref
  const [editorHeight, setEditorHeight] = useState(); // 에디터 높이
  const [consoleHeight, setConsoleHeight] = useState(""); // 콘솔 높이
  const [compiledOutputList, setCompiledOutputList] = useState([]); // 컴파일 출력 결과
  const [loadingCompile, setLoadingCompile] = useState(false); // 컴파일 로딩

  const editorOptions = {
    scrollBeyondLastLine: false,
    fontSize: setting.editors.fontSize,
    fontFamily: setting.editors.font,
    autoIndent: "advanced",
    wrappingIndent: "same",
    automaticLayout: true,
    wordWrap: setting.editors.autoLine,
  };

  // 콘솔 높이 초기값 세팅
  useEffect(() => {
    const resizeHandler = () => {
      setEditorHeight(editorHeightRef.current.pane1.clientHeight - 34); // 에디터 높이 변경값 셋
      setConsoleHeight(editorHeightRef.current.pane2.clientHeight - 0.5); // 콘솔 높이 변경값 셋
    }; // 브라우저 사이즈 변경할 때 에디터와 콘솔 높이 변경
    setEditorHeight(editorHeightRef.current.pane1.clientHeight - 34);
    setConsoleHeight(editorHeightRef.current.pane2.clientHeight - 0.5);
    window.addEventListener("resize", resizeHandler); // 브라우저 사이즈 변경 감지
    return () => window.removeEventListener("resize", resizeHandler); // 메모리 누수 방지?
  }, []);

  // 화면 분할 드래그
  const checkSizeHandler = () => {
    const tempSize = editorHeightRef.current.state.pane1Size;
    const offsetSize = editorHeightRef.current.splitPane.clientHeight;
    const horizonSplit = parseInt((tempSize / offsetSize) * 100);
    setSetting((prev) => ({ ...prev, horizonSplit }));
    setEditorHeight(editorHeightRef.current.pane1.clientHeight - 34);
    setConsoleHeight(editorHeightRef.current.pane2.clientHeight - 0.5);
  };

  // 코드 실행 버튼 클릭
  const startCompile = async (enteredInput) => {
    setLoadingCompile(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCompiledOutputList(enteredInput.split("\n"));
    setLoadingCompile(false);
    // setLintResultList([]);
    // const dataToCompile = { type: projectType, filePath: selectedFilePath, input: enteredInput };
  };

  // 코드 실행 멈춤 버튼 클릭
  const stopCompile = async () => {
    setLoadingCompile(false);
    setCompiledOutputList([]);
    // setLintResultList([]);
  };

  // 출력창 문자열 클릭
  const toGoogle = (searchQuery) => {
    if (searchQuery.includes("k7d207.p.ssafy.io"))
      window.open(`http://${searchQuery}`, "_blank");
    else
      window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  };

  return (
    <div
      className="flex flex-col ml-[8px] h-full"
      style={
        lastClickedSidebarIcon === ""
          ? { width: "calc(100vw - 105px)" }
          : { width: "calc(100vw - 400px)" }
      }
    >
      {/* 화면 분할: 위, 아래 */}
      <SplitPane
        style={{ position: "static", height: "auto" }}
        split="horizontal"
        minSize={30}
        maxSize={-30}
        defaultSize={setting.horizonSplit + "%"}
        className="vertical Pane1"
        ref={editorHeightRef}
        onDragFinished={checkSizeHandler}
      >
        {/* 위: 파일 경로, 코드 에디터 */}
        <div className="w-full">
          {/* 파일 경로 표시 박스 */}
          <div className="text-sm flex items-center bg-component_item_bg_dark p-1 rounded-lg mb-1.5">
            <TiArrowRightThick className="text-point_yellow" />
            <div className="ml-2 break-all">{selectedFilePath}</div>
          </div>
          {/* 코드 에디터 */}
          <Editor
            style={{ overflow: "auto" }}
            height={editorHeight}
            theme="vs-dark"
            defaultLanguage="python"
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            options={editorOptions}
          />
        </div>
        {/* 아래: 콘솔 터미널 */}
        <ConsoleTerminal
          consoleHeight={consoleHeight}
          consoleSetting={setting.consoles}
          loadingCompile={loadingCompile} // 컴파일 미니 로딩
          compiledOutputList={compiledOutputList}
          startCompile={startCompile}
          stopCompile={stopCompile}
          toGoogle={toGoogle}
        />
      </SplitPane>
    </div>
  );
};

export default EditorAndConsoleTerminal;
