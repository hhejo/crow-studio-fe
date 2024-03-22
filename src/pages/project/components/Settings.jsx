// React
import { Fragment, useState } from "react";
// UI
import { Combobox, Transition, Switch } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// Toast
import { toast } from "react-toastify";

// Combobox items
const fonts = [
  { id: 1, name: "JetBrains Mono" }, // default
  { id: 2, name: "Monospace" },
  { id: 3, name: "IBM Plex Sans" },
  { id: 5, name: "Inter" },
  { id: 6, name: "Courier" },
];

export const Settings = ({ setting, saveSetting, setSetting }) => {
  const [query, setQuery] = useState("");
  const [nowEditorFont, setNowEditorFont] = useState(
    fonts.filter((font) => font.name === setting.editors.font)[0]
  );
  const [nowConsoleFont, setNowConsoleFont] = useState(
    fonts.filter((font) => font.name === setting.consoles.font)[0]
  );
  const [checkSwitch, setCheckSwitch] = useState(
    setting.editors.autoLine ? true : false
  );

  // // 에디터 라인
  // const [editorSide, setEditorSide] = useState({
  //   fontSize: setting.editors.fontSize,
  //   font: setting.editors.font,
  //   autoLine: true,
  // });

  // // 콘솔 파트
  // const [consoleSide, setConsoleSide] = useState({
  //   fontSize: setting.consoles.fontSize,
  //   font: setting.consoles.font,
  // });

  const filteredFonts =
    query === ""
      ? fonts
      : fonts.filter((font) =>
          font.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  // useState 변경
  const editorChange = (where, e) => {
    if (where === "fontSize") {
      setSetting((prev) => {
        return {
          ...prev,
          editors: {
            fontSize: e.target.value,
            font: setting.editors.font,
            autoLine: setting.editors.autoLine,
          },
        };
      });
      // setEditorSide({ ...editorSide, fontSize: e.target.value });
    } else if (where === "font") {
      setNowEditorFont(() => fonts.filter((font) => font.name === e.name)[0]);
      setSetting((prev) => {
        return {
          ...prev,
          editors: {
            fontSize: setting.editors.fontSize,
            font: e.name,
            autoLine: setting.editors.autoLine,
          },
        };
      });
      // setEditorSide({ ...editorSide, font: e.name });
    } else {
      setSetting((prev) => {
        return {
          ...prev,
          editors: {
            fontSize: setting.editors.fontSize,
            font: setting.editors.font,
            autoLine: !setting.editors.autoLine,
          },
        };
      });
      setCheckSwitch((prev) => !prev);
      // setEditorSide({ ...editorSide, autoLine: !editorSide.autoLine });
    }
  };

  const consoleChange = (where, e) => {
    // console.log(consoleSide);
    if (where === "fontSize") {
      console.log(e.target.value);
      setSetting((prev) => {
        return {
          ...prev,
          consoles: {
            fontSize: e.target.value,
            font: setting.consoles.font,
          },
        };
      });
      // setConsoleSide({ ...consoleSide, fontSize: e.target.value });
    } else {
      setSetting((prev) => {
        return {
          ...prev,
          consoles: {
            fontSize: setting.consoles.fontSize,
            font: e.name,
          },
        };
      });
      setNowConsoleFont(fonts.filter((font) => font.name === e.name)[0]);
    }
  };

  // 세팅 저장
  const trySave = () => {
    saveSetting();
    toast.success("세팅이 저장되었습니다");
  };

  return (
    <section className="mb-3 bg-component_item_bg_dark flex flex-col overflow-auto h-full rounded-r-lg">
      <div
        className="flex justify-between items-center"
        style={{ padding: 15 }}
      >
        <div className="text-xl font-bold text-white my-1">Settings</div>
      </div>

      {/* 줄 */}
      <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />

      {/*  */}
      <div className="" style={{ padding: 15 }}>
        {/* 에디터 폰트 크기 */}
        <div className="pl-1">
          <label
            className="block text-primary_dark text-xl font-bold mb-2"
            htmlFor="editorFontSize"
          >
            에디터 폰트 크기
          </label>
          <input
            className="rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-xs font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
            style={{ height: 28, width: 217 }}
            id="editorFontSize"
            type="text"
            placeholder="Editor Font Size"
            onChange={(e) => editorChange("fontSize", e)}
            value={setting.editors.fontSize}
          />
        </div>

        {/* 에디터 폰트 */}
        <div className="pl-1 mt-5">
          <div className="text-primary_dark text-xl font-bold mb-2">
            에디터 폰트
          </div>
          {/* headless ui combobox */}
          <Combobox
            value={nowEditorFont}
            onChange={(e) => editorChange("font", e)}
            className="mb-5"
          >
            <div className="relative mt-1">
              <div
                className="relative flex justify-between items-center rounded-md bg-component_item_bg_+2_dark px-1.5 py-2 text-xs font-medium text-white text-left shadow-sm hover:bg-point_purple_op20 active:outline-none active:ring-2 active:ring-point_purple"
                style={{ height: 26, width: 217 }}
              >
                <Combobox.Input
                  className="border-none pr-4 py-1 text-xs font-medium text-white bg-transparent 
                    focus:outline-none focus:border-none focus:ring-0"
                  displayValue={(font) => font.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options
                  className="absolute z-10 mt-0.5 origin-top-right rounded-md bg-component_item_bg_+2_dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{ height: 130, width: 217 }}
                >
                  {filteredFonts.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredFonts.map((font) => (
                      <Combobox.Option
                        key={font.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-1 text-xs pl-10 pr-4 hover:bg-point_purple_op20 rounded-md ${
                            active
                              ? "bg-point_purple_op20 text-white"
                              : "text-white"
                          }`
                        }
                        value={font}
                        style={{
                          height: 26,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {font.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active
                                    ? "bg-point_purple_op20 text-point_purple"
                                    : "text-white"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5 text-point_purple"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        {/* 에디터 자동 줄바꿈 */}
        <div className="pl-1 mt-5 flex items-center">
          <div className="text-primary_dark text-xl font-bold ">
            에디터 자동 줄바꿈
          </div>
          <Switch
            checked={checkSwitch}
            onChange={(e) => editorChange("autoLine", e)}
            className={`${
              checkSwitch ? "bg-point_purple" : "bg-component_item_bg_+2_dark"
            }
                relative inline-flex h-[26px] w-[46px] ml-[25px] text-right shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                checkSwitch ? "translate-x-[20px]" : "translate-x-[0.5px]"
              }
                  pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>

        {/* 콘솔 폰트 크기 */}
        <div className="pl-1 mt-5">
          <label
            className="block text-primary_dark text-xl font-bold mb-2"
            htmlFor="consoleFontSize"
          >
            콘솔 폰트 크기
          </label>
          <input
            className="rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-xs font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
            style={{ height: 28, width: 217 }}
            id="consoleFontSize"
            type="text"
            placeholder="Console Font Size"
            onChange={(e) => consoleChange("fontSize", e)}
            value={setting.consoles.fontSize}
          />
        </div>

        {/* 콘솔 폰트 */}
        <div className="pl-1 mt-5">
          <div className="text-primary_dark text-xl font-bold mb-2">
            콘솔 폰트
          </div>
          {/* headless ui combobox */}
          <Combobox
            defaultValue={nowConsoleFont}
            onChange={(e) => consoleChange("font", e)}
            className="mb-5"
          >
            <div className="relative mt-1">
              <div
                className="relative flex justify-between items-center rounded-md bg-component_item_bg_+2_dark px-1.5 py-2 text-xs font-medium text-white text-left shadow-sm hover:bg-point_purple_op20 active:outline-none active:ring-2 active:ring-point_purple"
                style={{ height: 26, width: 217 }}
              >
                <Combobox.Input
                  className="border-none pr-4 py-1 text-xs font-medium text-white bg-transparent 
                    focus:outline-none focus:border-none focus:ring-0"
                  displayValue={(font) => font.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options
                  className="absolute z-10 mt-0.5 origin-top-right rounded-md bg-component_item_bg_+2_dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{ height: 130, width: 217 }}
                >
                  {filteredFonts.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredFonts.map((font) => (
                      <Combobox.Option
                        key={font.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-1 text-xs pl-10 pr-4 hover:bg-point_purple_op20 rounded-md ${
                            active
                              ? "bg-point_purple_op20 text-white"
                              : "text-white"
                          }`
                        }
                        value={font}
                        style={{
                          height: 26,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {font.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active
                                    ? "bg-point_purple_op20 text-point_purple"
                                    : "text-white"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5 text-point_purple"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        {/* 저장 버튼 */}
        <div className="ml-1 my-5">
          <button
            onClick={trySave}
            className="h-[26px] w-[60px] rounded-md bg-point_purple hover:bg-point_purple_-2 text-white text-sm font-bold"
          >
            저장하기
          </button>
        </div>
      </div>
    </section>
  );
};
