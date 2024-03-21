// React
import { useState } from "react";
// Tooltip
import ReactTooltip from "react-tooltip";
// Icon
import { IoAdd, IoClose } from "react-icons/io5";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";
// Component
import { ProjectTypeSelect } from "../../components/ProjectTypeSelect";

// headlist listbox items
const pjtType = [
  { name: "pure Python" },
  { name: "Django" },
  { name: "Flask" },
  { name: "FastAPI" },
];

export const TeamDetailMain = (props) => {
  const { leaderNickname, isLeader, myTeammates, teamGit } = props;
  const { showProjectTypeSelect, setShowProjectTypeSelect } = props;
  const { projectType, updateProjectType } = props;
  const { removeTeammate, openModal } = props;

  const [selected, setSelected] = useState(pjtType[0]);

  const listboxChangeHandler = (e) => setSelected(e);

  const updateProjectTypeHandler = () => updateProjectType(selected.name);

  const removeTeammateHandler = (teammateToRemove) =>
    removeTeammate(teammateToRemove);

  return (
    <>
      {/* 팀장 */}
      <div className="flex items-center mb-2 md:w-full w-[285px] h-fit bg-component_item_bg_dark rounded-md">
        <div className="md:w-48 w-32 text-white font-bold bg-point_purple_op20 h-full p-2 flex items-center rounded-bl-md rounded-tl-md">
          팀장
        </div>
        <div className="flex flex-col items-center p-2">
          <div className="text-white text-sm flex items-center">
            {leaderNickname}
          </div>
        </div>
      </div>

      {/* 팀원 */}
      <div className="flex mb-2 md:w-full w-[285px] bg-component_item_bg_dark rounded-md">
        <div className="md:w-48 w-32 bg-point_purple_op20 p-2 flex items-center rounded-bl-md rounded-tl-md">
          <span className="text-white font-bold">팀원</span>
          <span className="text-point_light_yellow text-xs font-semibold mr-2 px-1.5 py-0.5 rounded">
            {myTeammates.length}
          </span>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center">
          {myTeammates.length === 0 && (
            <div className="text-sm flex items-center py-2 pl-2">
              팀원을 추가
            </div>
          )}
          {/* <Teammate
            key={`${teammate.docId}`}
            isLeader={isLeader}
            teammateNickname={teammate.nickname}
            teammateDocId={teammate.docId}
            removeTeammate={removeTeammate}
          /> */}
          {myTeammates.map((teammate) => (
            <div
              key={`${teammate.docId}`}
              className="flex flex-col items-center p-2"
            >
              <div className="text-white text-sm flex items-center">
                {teammate.nickname}
                {isLeader && (
                  <IoClose
                    className="cursor-pointer text-point_pink hover:text-point_red hover:scale-125 transition"
                    onClick={() => removeTeammateHandler(teammate)}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center px-2 py-2">
            {isLeader && (
              <div>
                <IoAdd
                  className="text-white cursor-pointer text-lg hover:text-point_yellow hover:scale-125 transition"
                  onClick={openModal}
                  data-tip="팀원 추가"
                />
                <ReactTooltip place="right" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 팀 깃 주소 */}
      <div className="flex mb-2 md:w-full w-[285px] bg-component_item_bg_dark rounded-md">
        <div className="md:w-48 w-32 min-w-[128px] text-white font-bold bg-point_purple_op20 p-2 flex items-center rounded-bl-md rounded-tl-md">
          깃 주소
        </div>
        <div className="flex">
          <div className="text-white text-sm break-all p-2">
            {teamGit ? teamGit : "팀 깃 주소가 존재하지 않습니다"}
          </div>
        </div>
      </div>

      {/* 프로젝트 타입 */}
      <div className="flex mb-4 md:w-full w-[285px] bg-component_item_bg_dark rounded-md">
        <div className="md:w-48 w-32 text-white font-bold bg-point_purple_op20 p-2 flex items-center rounded-bl-md rounded-tl-md">
          프로젝트 타입
        </div>
        <div className="flex">
          <div className="text-white text-sm p-2">
            {!showProjectTypeSelect && (
              <div className="flex items-center">
                <span>{projectType}</span>
                {isLeader && (
                  <BsPencilFill
                    className="ml-3 text-sm text-point_yellow_+2 cursor-pointer hover:text-point_yellow hover:scale-125 transition"
                    onClick={() => setShowProjectTypeSelect(true)}
                    data-tip="프로젝트 타입 변경"
                  />
                )}
              </div>
            )}
            {showProjectTypeSelect && (
              <div className="w-full flex justify-start">
                <div className="md:w-72 w-[115px]">
                  <ProjectTypeSelect
                    selected={selected}
                    onChange={listboxChangeHandler}
                    pjtType={pjtType}
                  />
                </div>
                <button className="ml-2" onClick={updateProjectTypeHandler}>
                  <BsCheckLg className="text-point_light_yellow hover:text-point_yellow" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
