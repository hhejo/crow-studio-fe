import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
// import * as monaco from "monaco-editor";
import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const YMonaco = () => {
  const editorRef = useRef(null);
  const location = useLocation();
  const teamSeq = location.state.teamSeq ? location.state.teamSeq : 332;
  const options = location.state.options;

  const editorOptions = {
    scrollBeyondLastLine: false,
    fontSize: options.fontSize,
    fontFamily: options.font,
    autoIndent: "advanced",
    wrappingIndent: "same",
    automaticLayout: true,
    wordWrap: options.autoLine,
  };

  const navigate = useNavigate();

  const link = () => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      teamSeq,
      ydoc
    );
    const ytext = ydoc.getText("monaco");

    const monacoBinding = new MonacoBinding(
      ytext,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
    window.example = { provider, ydoc, ytext, monacoBinding };
  };

  useEffect(() => {
    window.addEventListener("load", link);

    return () => {
      window.removeEventListener("load", () => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(
          "wss://demos.yjs.dev",
          teamSeq,
          ydoc
        );
        provider.disconnect();
      });
    };
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <div style={{ margin: "0.25em 1em" }}>
        <span onClick={goBack} style={{ cursor: "pointer" }}>
          돌아가기
        </span>
      </div>
      <Editor
        style={{ overflow: "auto" }}
        height="100%"
        theme="vs-dark"
        defaultLanguage="python"
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        options={editorOptions}
      />
    </React.Fragment>
  );
};

export default YMonaco;
