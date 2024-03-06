import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { InputForm } from "../../components/forms/InputForm";
import { Button } from "../../components/Button";

const initialInputState = {
  teamName: "",
  projectType: "pure Python",
  teamGit: "",
};

const initialErrorState = { teamNameErrMsg: "", teamGitErrMsg: "" };

// headlist listbox items
const pjtType = [
  { name: "pure Python" },
  { name: "Django" },
  { name: "Flask" },
  { name: "FastAPI" },
];

const TeamForms = ({ createTeam }) => {
  const [inputs, setInputs] = useState(initialInputState);
  const [errorMsgs, setErrorMsgs] = useState(initialErrorState);
  const { teamName, projectType, teamGit } = inputs;
  const { teamNameErrMsg, teamGitErrMsg } = errorMsgs;
  const [checkGit, setCheckGit] = useState(false);
  const [selected, setSelected] = useState(pjtType[0]); // listbox

  const inputChangeHandler = (e) => {
    if (e.name) {
      setInputs((prev) => {
        return { ...prev, projectType: e.name };
      });
      return;
    }
    if (e.target.name === "teamName") {
      setInputs((prev) => {
        return { ...prev, teamName: e.target.value };
      });
      setErrorMsgs((prev) => {
        return { ...prev, teamNameErrMsg: "" };
      });
    } else if (e.target.name === "teamGit") {
      setInputs((prev) => {
        return { ...prev, teamGit: e.target.value };
      });
      setErrorMsgs((prev) => {
        return { ...prev, teamGitErrMsg: "" };
      });
    } else if (e.target.name === "checkGit") {
      setCheckGit((prev) => !prev);
      setErrorMsgs((prev) => {
        return { ...prev, teamGitErrMsg: "" };
      });
    }
  };

  const listboxChangeHandler = (e) => {
    setSelected(e);
    inputChangeHandler(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMsgs(initialErrorState);
    let isValid = true;
    if (teamName.trim().length === 0) {
      setErrorMsgs((prev) => {
        return { ...prev, teamNameErrMsg: "팀 이름을 입력하세요" };
      });
      isValid = false;
    }
    const invalidTeamName =
      teamName.trim() === "400" ||
      teamName.trim() === "403" ||
      teamName.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
    if (invalidTeamName) {
      setErrorMsgs((prev) => {
        return { ...prev, teamNameErrMsg: "사용할 수 없는 팀 이름입니다" };
      });
      isValid = false;
    }
    if (checkGit && teamGit.trim().length === 0) {
      setErrorMsgs((prev) => {
        return { ...prev, teamGitErrMsg: "팀 깃 주소를 입력하세요" };
      });
      isValid = false;
    }
    if (!isValid) return;
    const newTeamData = {
      teamName,
      projectType,
      teamGit: checkGit ? teamGit : null,
    };
    createTeam(newTeamData);
    setInputs(initialInputState);
    setErrorMsgs(initialErrorState);
  };

  return (
    <form
      method="post"
      onSubmit={submitHandler}
      className="flex flex-col items-center"
    >
      {/* 팀 이름 */}
      <InputForm
        type="text"
        id="teamName"
        name="teamName"
        placeholder="팀 이름을 입력하세요"
        htmlFor="teamName"
        labelContent="팀 이름 (영문, 숫자)"
        value={teamName}
        onChange={inputChangeHandler}
        errMsg={teamNameErrMsg}
      />

      {/* 프로젝트 종류 */}
      <div className="xs:w-80 w-auto mb-7">
        {/* headlessui Listbox */}
        <div className="">
          <Listbox
            name="projectType"
            value={selected}
            onChange={listboxChangeHandler}
          >
            <div className="relative mt-1">
              <Listbox.Label>프로젝트 종류</Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-component_item_bg_+2_dark text-white py-2 pl-3 pr-10 text-left shadow-md active:outline-none active:ring-2 active:ring-point_purple focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-point_purple"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-component_item_bg_+2_dark text-white py-1 text-base shadow-lg focus:outline-none">
                  {pjtType.map((type, typeIdx) => (
                    <Listbox.Option
                      key={typeIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-1.5 pl-10 pr-4 ${
                          active ? "bg-point_purple_op20" : ""
                        }`
                      }
                      value={type}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {type.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-point_purple">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {/* 팀 깃 주소 */}
      <div className="xs:w-80 w-[226.03px] mb-4">
        {/* 체크박스 */}
        <input
          type="checkbox"
          id="checkGit"
          name="checkGit"
          className="bg-component_item_bg_+2_dark hover:bg-point_purple_op20 cursor-pointer border-3 border-primary-dark rounded checked:bg-point_purple text-point_purple focus:ring-0 mr-2"
          defaultValue={checkGit}
          onChange={inputChangeHandler}
        />
        <label htmlFor="teamGit" className="">
          프로젝트 깃 주소
          <span className="ml-3 text-sm text-primary_-2_dark">체크박스</span>
        </label>
        <input
          type="text"
          id="teamGit"
          name="teamGit"
          className="mt-1 w-full text-white py-2 px-3 bg-component_item_bg_+2_dark disabled:bg-component_-2_dark placeholder:text-gray-300 disabled:placeholder:text-component_item_bg_+2_dark placeholder:text-sm active:outline-none active:ring-2 active:ring-point_purple focus:outline-none focus:ring-2 focus:ring-point_purple focus:border-none rounded-md transition"
          placeholder="프로젝트 깃 주소를 입력하세요"
          disabled={!checkGit}
          value={teamGit}
          onChange={inputChangeHandler}
        />
        <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
          {teamGitErrMsg}
        </div>
      </div>

      {/* 팀 생성 버튼 */}
      <Button type="submit" onClick={submitHandler}>
        팀 생성
      </Button>
    </form>
  );
};

export default TeamForms;
