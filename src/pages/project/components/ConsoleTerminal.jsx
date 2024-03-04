import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import compileApi from "../../../api/compileApi";

import { startLoading, endLoading } from "../../../redux/globalSlice";

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
    setting,
  } = props;

  useEffect(() => {
    setFinalOutputDataList(lintResultList);
  }, [lintResultList]);

  const changeInputData = (e) => setInputData(e.target.value);

  const startCompileHandler = async () => {
    dispatch(startLoading());
    // setLintResultList([]);
    const compileData = {
      type: projectType,
      filePath: selectedFilePath,
      input: inputData,
    };
    try {
      const res = await compileApi.getCompileResult(compileData);
      // setOutputData(res.data.response);
      setFinalOutputDataList(res.data.response.split("\n"));
      dispatch(endLoading());
    } catch (err) {
      dispatch(endLoading());
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
      // navigate("/redirect/server", {
      //   state: { url: `http://${searchQuery}` },
      // });
      window.open(`http://${searchQuery}`, "_blank");
    } else {
      // navigate("/redirect", {
      //   state: { url: `https://www.google.com/search?q=${searchQuery}` },
      // });
      window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
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
            data-tip="코드 실행"
          />
          <BsStopFill
            className="cursor-pointer hover:text-point_purple hover:scale-110 transition"
            size="27"
            onClick={stopCompileHandler}
            data-tip="코드 실행 멈춤"
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
              whiteSpace: "pre-wrap",
            }}
          >
            {isLoading && (
              <div className="flex justify-center items-center overflow-x-hidden h-full">
                <LoadingMini />
              </div>
            )}
            {/* {!isLoading && lintResultList.length === 0 && outputData}
            {!isLoading &&
              lintResultList.length > 0 &&
              lintResultList.map((lintResult, i) => (
                <div className="cursor-pointer" key={i}>
                  {lintResult}
                </div>
              ))} */}
            {!isLoading &&
              finalOutputDataList.map((el, i) => (
                <div
                  key={i}
                  className="cursor-pointer hover:text-point_purple transition break-all"
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
