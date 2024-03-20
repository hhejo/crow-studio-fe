// React
import { useState } from "react";
// Components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ProjectTypeSelect } from "../../components/ProjectTypeSelect";

// headlist listbox items
const pjtType = [
  { name: "pure Python" },
  { name: "Django" },
  { name: "Flask" },
  { name: "FastAPI" },
];

export const TeamCreateForm = (props) => {
  const { createTeam } = props;

  const [teamName, setTeamName] = useState("");
  const [checkTeamGit, setCheckTeamGit] = useState(false);
  const [teamGit, setTeamGit] = useState("");
  const [projectType, setProjectType] = useState("pure Python");

  const [selected, setSelected] = useState(pjtType[0]); // listbox

  const [teamNameErrMsg, setTeamNameErrMsg] = useState("");
  const [teamGitErrMsg, setTeamGitErrMsg] = useState("");

  // 팀 이름, 프로젝트 종류, 프로젝트 깃 주소 입력창 onChange 핸들러
  const inputChangeHandler = (e) => {
    if (e.name) {
      setProjectType(e.name);
      return;
    }
    if (e.target.name === "teamName") {
      setTeamName(e.target.value);
      setTeamNameErrMsg("");
    } else if (e.target.name === "checkGit") {
      setCheckTeamGit((prev) => !prev);
      setTeamGitErrMsg("");
    } else if (e.target.name === "teamGit") {
      setTeamGit(e.target.value);
      setTeamGitErrMsg("");
    }
  };

  // listbox onChange 핸들러
  const listboxChangeHandler = (e) => {
    setSelected(e);
    inputChangeHandler(e);
  };

  // 팀 생성 제출 핸들러
  const createTeamHandler = (e) => {
    e.preventDefault();
    setTeamNameErrMsg("");
    setTeamGitErrMsg("");
    let isValid = true;
    let msg = "";
    // 팀 이름
    if (teamName.trim().length === 0) {
      msg = "팀 이름을 입력하세요";
      setTeamNameErrMsg(msg);
      isValid = false;
    } else if (teamName.trim().length > 10) {
      msg = "팀 이름을 10자 이하로 입력하세요";
      setTeamNameErrMsg(msg);
      isValid = false;
    }
    const invalidTeamName =
      teamName.trim() === "400" ||
      teamName.trim() === "403" ||
      teamName.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/);
    if (invalidTeamName) {
      msg = "사용할 수 없는 팀 이름입니다";
      setTeamNameErrMsg(msg);
      isValid = false;
    }
    // 깃 주소
    if (checkTeamGit && teamGit.trim().length === 0) {
      msg = "깃 주소를 입력하세요";
      setTeamGitErrMsg(msg);
      isValid = false;
    }
    if (checkTeamGit && teamGit.trim().length > 100) {
      msg = "깃 주소가 너무 깁니다";
      setTeamGitErrMsg(msg);
      isValid = false;
    }
    if (!isValid) return;
    const teamData = {
      teamName,
      projectType,
      teamGit: checkTeamGit ? teamGit : null,
    };
    setTeamNameErrMsg("");
    setTeamGitErrMsg("");
    createTeam(teamData);
  };

  return (
    <form
      method="post"
      onSubmit={createTeamHandler}
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
          defaultValue={checkTeamGit}
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
          className="mt-1 w-full text-white py-2 px-3 bg-component_item_bg_+2_dark disabled:bg-component_-2_dark border-none outline-none placeholder:text-gray-300 disabled:placeholder:text-component_item_bg_+2_dark placeholder:text-sm active:outline-none active:ring-2 active:ring-point_purple focus:outline-none focus:ring-2 focus:ring-point_purple focus:border-none rounded-md transition"
          placeholder="프로젝트 깃 주소를 입력하세요"
          disabled={!checkTeamGit}
          value={teamGit}
          onChange={inputChangeHandler}
        />
        <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
          {teamGitErrMsg}
        </div>
      </div>

      {/* 팀 생성 버튼 */}
      <Button type="submit" onClick={createTeamHandler}>
        팀 생성
      </Button>
    </form>
  );
};
