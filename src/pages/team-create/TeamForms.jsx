import { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ProjectTypeSelect } from "../../components/ProjectTypeSelect";

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
      <Input
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
        <ProjectTypeSelect
          selected={selected}
          onChange={listboxChangeHandler}
          pjtType={pjtType}
          labelContent="프로젝트 종류"
        />
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
