import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import compileApi from "../../../api/compileApi";
import editorApi from "../../../api/editorApi";
import fileApi from "../../../api/fileApi";

import { startLoading, endLoading } from "../../../redux/global-slice";

import { BsPlayFill } from "react-icons/bs";
import { BsStopFill } from "react-icons/bs";
import { TbTerminal } from "react-icons/tb";

import LoadingMini from "../../../components/LoadingMini";

const ConsoleTerminal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.global.value.isLoading);
  const { teamName, projectType } = useSelector((state) => state.team.value);
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [finalOutputDataList, setFinalOutputDataList] = useState([]);

  const {
    teamSeq,
    selectedFilePath,
    consoleHeight,
    lintResultList,
    setLintResultList,
    editorRef,
    setting,
  } = props;

  useEffect(() => {
    setFinalOutputDataList(lintResultList);
  }, [lintResultList]);

  const changeInputData = (e) => setInputData(e.target.value);

  const startCompileHandler = async () => {
    dispatch(startLoading());

    // try {
    //   // // 3. 파일 저장
    //   // const fileContentData = {
    //   //   filePath: selectedFilePath,
    //   //   fileContent: res2.data.data,
    //   // };
    //   // await fileApi.saveFileContent(teamSeq, fileContentData);

    //   // // 린트
    //   // setLintResultList([]);
    //   // const textCodeData = { text: fileContentData.fileContent };
    //   // const res = await editorApi.lint("python", textCodeData);
    //   // const warnings = res.data.data;
    //   // const indexes = res.data.index;
    //   // setLintResultList(
    //   //   warnings.map((warning, i) => `Line ${indexes[i]}: ${warning}`)
    //   // );

    //   // 4. 파일 내용 가져오기
    //   const filePathData = { filePath: selectedFilePath };
    //   const res3 = await fileApi.getFileContent(filePathData);
    //   editorRef.current.getModel().setValue(res3.data.fileContent);
    //   dispatch(endLoading());
    //   toast.success("파일 저장 성공");
    // } catch (err) {
    //   dispatch(endLoading());
    //   toast.error("파일 저장 실패");
    // }

    // setLintResultList([]);
    const compileData = {
      fileContent: editorRef.current.getValue(),
      input: inputData,
    };
    try {
      const res = await compileApi.getUnLoginCompileResult(compileData);
      // setOutputData(res.data.response);
      console.log(res.data.response.split("\n"));
      setFinalOutputDataList(res.data.response.split("\n"));
      dispatch(endLoading());
    } catch (err) {
      toast.error("컴파일 오류");
    }
  };

  const stopCompileHandler = async () => {
    dispatch(endLoading());
    // setLintResultList([]);
    const teamData = { teamSeq, teamName };
    try {
      await compileApi.stopCompile(teamData);
      setFinalOutputDataList([]);
    } catch (err) {
      dispatch(endLoading());
      toast.error("컴파일 오류");
    }
  };

  const inputChangeHandler = (e) => changeInputData(e);

  const consoleHeightReal = consoleHeight - 8;
  const boxHeight = consoleHeight - 88;

  const toGoogleHandler = (searchQuery) => {
    if (searchQuery.includes("k7d207.p.ssafy.io")) {
      navigate("/redirect/server", {
        state: { url: `http://${searchQuery}` },
      });
    } else {
      navigate("/redirect", {
        state: { url: `https://www.google.com/search?q=${searchQuery}` },
      });
    }
  };

  return (
    <div
      className="mt-[8px] px-3 rounded-[10px] bg-component_-2_dark"
      style={{ height: consoleHeightReal }}
    >
      {/* console 상단 */}
      <div className="flex justify-between items-center mx-[5px] py-1.5">
        <div className="flex items-center text-white font-bold text-[14px]">
          <TbTerminal className="mr-1" />
          Console
        </div>
        <div className="flex items-center">
          {/* btns */}
          <BsPlayFill
            onClick={startCompileHandler}
            className={`mr-[10px] cursor-pointer hover:text-point_purple hover:scale-110 transition ${
              isLoading && "animate-pulse"
            }`}
            size="27"
          />
          <BsStopFill
            className="cursor-pointer hover:text-point_purple hover:scale-110 transition"
            size="27"
            onClick={stopCompileHandler}
          />
        </div>
      </div>
      {/* console 하단 */}
      <div className="flex justify-between" style={{ height: boxHeight }}>
        {/* input */}
        <div className="w-1/2 mr-1">
          <div className="flex items-center sm:w-[138px] w-full h-[31px] px-3 text-sm text-white bg-component_item_bg_dark rounded-t-[10px] border-b-2 border-point_purple">
            <div className="flex items-center truncate overflow-hidden">
              <TbTerminal className="mr-1" />
              Input
            </div>
          </div>
          <textarea
            name="input"
            value={inputData}
            onChange={inputChangeHandler}
            placeholder="Input here"
            className="resize-none w-full h-full p-[10px] bg-component_item_bg_dark rounded-[10px] rounded-tl-[0px] text-sm font-medium text-white text-left break-all appearance-none shadow-xs focus:outline-none focus:ring-2 focus:ring-point_purple focus:border-none placeholder:text-primary_dark overflow-auto"
            style={{
              fontSize: parseInt(setting.fontSize),
              fontFamily: setting.font,
            }}
          ></textarea>
        </div>
        {/* output */}
        <div className="w-1/2 ml-1">
          <div className="flex items-center sm:w-[138px] w-full h-[31px] px-3 text-sm text-white bg-component_item_bg_+2_dark rounded-t-[10px] border-b-2 border-point_purple">
            <div className="flex items-center truncate overflow-hidden">
              <TbTerminal className="mr-1" />
              Output
            </div>
          </div>
          <div
            className={`w-full h-full p-[10px] bg-component_item_bg_+2_dark rounded-[10px] rounded-tl-[0px] text-sm font-medium text-white overflow-auto ${
              isLoading && "flex items-center justify-center"
            }`}
            style={{
              fontSize: parseInt(setting.fontSize),
              fontFamily: setting.font,
            }}
          >
            {isLoading && (
              <div className="h-full">
                <LoadingMini />
              </div>
            )}
            {!isLoading &&
              finalOutputDataList.map((el, i) => (
                <div
                  key={i}
                  className="cursor-pointer hover:text-point_purple transition"
                  onClick={() => toGoogleHandler(el)}
                >
                  {el}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleTerminal;
