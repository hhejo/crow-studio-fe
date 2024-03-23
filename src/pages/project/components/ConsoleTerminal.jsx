// React
import { useState } from "react";
// Icon
import { BsPlayFill, BsStopFill } from "react-icons/bs";
import { TbTerminal } from "react-icons/tb";
// Component
import { LoadingMini } from "../../../components/LoadingMini";

export const ConsoleTerminal = (props) => {
  const { consoleHeight, consoleSetting, loadingCompile } = props;
  const { compiledOutputList, startCompile, stopCompile, toGoogle } = props;
  const [enteredInput, setEnteredInput] = useState("");

  const startCompileHandler = () => startCompile(enteredInput);

  const stopCompileHandler = () => stopCompile();

  const toGoogleHandler = (searchQuery) => toGoogle(searchQuery);

  return (
    <div
      className="mt-[8px] px-3 rounded-[10px] bg-component_-2_dark"
      style={{ height: consoleHeight - 8 }}
    >
      {/* console 상단: 코드 실행, 멈춤 버튼 */}
      <div className="flex justify-between items-center mx-[5px] py-1.5">
        <div className="flex items-center text-white font-bold text-[14px]">
          <TbTerminal className="mr-1" />
          Console
        </div>
        {/* 코드 실행, 멈춤 버튼 */}
        <div className="flex items-center">
          {/* 코드 실행 버튼 */}
          <BsPlayFill
            onClick={startCompileHandler}
            className={`mr-[10px] cursor-pointer hover:text-point_purple hover:scale-110 transition ${
              loadingCompile && "animate-pulse"
            }`}
            size="27"
            data-tip="코드 실행"
          />

          {/* 실행 멈춤 버튼 */}
          <BsStopFill
            className="cursor-pointer hover:text-point_purple hover:scale-110 transition"
            size="27"
            onClick={stopCompileHandler}
            data-tip="코드 실행 멈춤"
          />
        </div>
      </div>

      {/* console 하단: Input, Output */}
      <div
        className="flex justify-between"
        style={{ height: consoleHeight - 88 }}
      >
        {/* Input */}
        <div className="w-1/2 mr-1">
          {/* Input 라벨 */}
          <div className="flex items-center sm:w-[138px] w-full h-[31px] px-3 text-sm text-white bg-component_item_bg_dark rounded-t-[10px] border-b-2 border-point_purple">
            <div className="flex items-center truncate overflow-hidden">
              <TbTerminal className="mr-1" />
              Input
            </div>
          </div>

          {/* Input 입력창 */}
          <textarea
            name="input"
            value={enteredInput}
            onChange={(e) => setEnteredInput(e.target.value)}
            placeholder="Input here"
            className="resize-none w-full h-full p-[10px] bg-component_item_bg_dark rounded-[10px] rounded-tl-[0px] text-sm font-medium text-white text-left break-all appearance-none shadow-xs focus:outline-none focus:ring-2 focus:ring-point_purple focus:border-none placeholder:text-primary_dark overflow-auto"
            style={{
              fontSize: parseInt(consoleSetting.fontSize),
              fontFamily: consoleSetting.font,
            }}
          ></textarea>
        </div>

        {/* Output */}
        <div className="w-1/2 ml-1">
          {/* Output 라벨 */}
          <div className="flex items-center sm:w-[138px] w-full h-[31px] px-3 text-sm text-white bg-component_item_bg_+2_dark rounded-t-[10px] border-b-2 border-point_purple">
            <div className="flex items-center truncate overflow-hidden">
              <TbTerminal className="mr-1" />
              Output
            </div>
          </div>

          {/* Output 출력창 */}
          <div
            className={`w-full h-full p-[10px] bg-component_item_bg_+2_dark rounded-[10px] rounded-tl-[0px] text-sm font-medium text-white overflow-auto ${
              loadingCompile && "flex items-center justify-center"
            }`}
            style={{
              fontSize: parseInt(consoleSetting.fontSize),
              fontFamily: consoleSetting.font,
              whiteSpace: "pre-wrap",
            }}
          >
            {loadingCompile ? (
              <div className="flex justify-center items-center overflow-x-hidden h-full">
                <LoadingMini />
              </div>
            ) : (
              compiledOutputList.map((outputString, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer hover:text-point_purple transition break-all"
                  onClick={() => toGoogleHandler(outputString)}
                >
                  {outputString}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
