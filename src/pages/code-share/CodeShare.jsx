import React from "react";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
//stomp와 sockjs 패키지로 깔고 임포트!!

const CodeShare = () => {
  const codeRef = useRef(null);
  const sock = new SockJs("https://까마귀공방.com/api/share");
  //client 객체 생성 및 서버주소 입력

  const stomp = StompJs.over(sock);
  //stomp로 감싸기

  const stompConnect = () => {
    try {
      stomp.connect({}, () => {
        stomp.subscribe("/topic/4/abc", (res) => {
          const changeCode = JSON.parse(res.body);
          console.log("get Data: ", changeCode, changeCode.content);
          codeRef.current.getModel().setValue(changeCode.content);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const stompDisconnect = () => {
    try {
      stomp.disconnect(() => {
        stomp.unsubscribe("/topic/4/abc");
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = () => {
    if (stomp && stomp.connected) {
      // const msg = {
      //   line: codeRef.current.getPosition().lineNumber,
      //   message: codeRef
      //     .getModel()
      //     .getLineContent(codeRef.current.getPosition().lineNumber),
      // };
      const msg = {
        content: codeRef.current.getValue(),
        path: "abc",
      };
      // console.log(JSON.stringify(msg));
      stomp.send("/code/share/4/abc", {}, JSON.stringify(msg));
    }
  };

  useEffect(() => {
    codeRef.current?.foucs();
    stompConnect();

    return () => {
      stompDisconnect();
    };
  });

  useEffect(() => {
    // codeRef.current.trigger(codeRef.current.keyCode.Enter)
    window.addEventListener("keyup", (e) => {
      // if (e.key === "Enter") {
      sendMessage();
      // }
    });
  });

  return (
    <React.Fragment>
      <Editor
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="hi"
        height="200px"
        onMount={(code) => (codeRef.current = code)}
        // onChange={sendMessage}
      />
    </React.Fragment>
  );
};

export default CodeShare;
