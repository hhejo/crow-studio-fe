import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { ReactComponent as IcAddTeam } from "../../../../assets/icons/ic_addTeam.svg";
// import { getTeamDetail } from "../../../../redux/teamSlice";

const Team = (props) => {
  const navigate = useNavigate();
  const { teamDocId, team, teammateList } = props;
  const { teamName, leaderNickname } = team;

  return (
    <div className="mb-3 bg-component_item_bg_dark flex flex-col overflow-auto h-full rounded-r-lg">
      <div
        className="flex justify-between items-center"
        style={{ padding: 15 }}
      >
        <div className="text-xl font-bold text-white my-1">Team</div>
        <div className="mt-1 flex items-center">
          {/* <IcSpan>
              <IcAddTeam className="h-[15px]" alt="IcAddTeam" />
            </IcSpan> */}
          {/* 드롭다운 */}
          {/* <Menu as="div" className="relative">
              <Menu.Button>
                <IcSpan className="flex">
                  <IcToggle alt="IcToggle" aria-hidden="true" />
                </IcSpan>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-6 -top-2 z-10 mt-2 w-36 origin-top-right rounded-md bg-component_item_bg_+2_dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-point_purple_op20 text-white"
                              : "text-white",
                            "block px-4 py-2 text-xs"
                          )}
                        >
                          팀 추가
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-point_purple_op20 text-white"
                              : "text-white",
                            "block px-4 py-2 text-xs"
                          )}
                        >
                          팀 삭제
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-point_purple_op20 text-white"
                              : "text-white",
                            "block px-4 py-2 text-xs"
                          )}
                        >
                          팀원 추가
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-point_purple_op20 text-white"
                              : "text-white",
                            "block px-4 py-2 text-xs"
                          )}
                        >
                          팀원 삭제
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
        </div>
      </div>
      {/* 줄 */}
      <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />
      {/* 팀 */}
      <div style={{ padding: 15 }}>
        <div className="pl-1">
          {/* 팀 이름 */}
          <div className="mb-4">
            <span
              className="text-point_light_yellow text-2xl font-bold hover:text-point_yellow cursor-pointer mr-2 transition"
              onClick={() => navigate(`/teams/${teamDocId}`)}
            >
              {teamName}
            </span>
            <span>팀</span>
          </div>
          {/* 팀장 */}
          <div className="mb-4">
            <div className="text-primary_dark text-lg mb-1">팀장</div>
            <div className="flex items-center text-white text-2xl font-bold">
              <div>{leaderNickname}</div>
            </div>
          </div>
          {/* 팀원 */}
          <div>
            <div className="text-primary_dark text-lg mb-1">팀원</div>
            {teammateList?.length === 0 && (
              <div className="text-white text-sm">팀원이 존재하지 않습니다</div>
            )}
            {teammateList?.length > 0 &&
              teammateList?.map((teammate) => (
                <div
                  key={`m${teammate.teammateDocId}`}
                  className="text-white text-2xl font-bold"
                >
                  {teammate.teammateNickname}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;

const IcSpan = styled.span`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #d9d9d9;
    border-radius: 5px;
    & svg {
      & path {
        fill: #2b2c2b;
      }
    }
  }
`;
