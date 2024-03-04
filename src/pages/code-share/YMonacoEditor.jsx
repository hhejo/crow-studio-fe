import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
// import * as monaco from "monaco-editor";
import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";

const YMonacoEditor = (props) => {
  const editorRef = useRef(null);
  const { teamSeq, option } = props;

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
        provider.destroy();
      });
    };
  });

  return (
    <React.Fragment>
      <Editor
        style={{ overflow: "auto" }}
        height="100%"
        theme="vs-dark"
        defaultLanguage="python"
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        options={option}
      />
    </React.Fragment>
  );
};

export default YMonacoEditor;
