import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
// import { Menu, Transition } from "@headlessui/react";

// import svg
import { ReactComponent as IcAddTeam } from "../../../../assets/icons/ic_addTeam.svg";
// import { ReactComponent as IcToggle } from "../../../../assets/icons/ic_toggle.svg";

import { getTeamDetail } from "../../../../redux/teamSlice";

// dropdown func
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

const Team = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamDocId } = useParams();
  const [team, setTeam] = useState({});
  const { teamName, teamLeaderNickname, memberDtoList: members } = team;

  useEffect(() => {
    dispatch(getTeamDetail(teamDocId))
      .unwrap()
      .then(setTeam)
      .catch(() => toast.error("팀 불러오기 실패"));
  }, [dispatch, teamDocId]);

  return (
    <React.Fragment>
      <TeamContainer className="mb-3 bg-component_item_bg_dark flex flex-col  overflow-auto">
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
        <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />
        <div className="" style={{ padding: 15 }}>
          <div className="pl-1">
            <div className="mb-4">
              <span
                className="text-point_light_yellow text-2xl font-bold hover:text-point_yellow cursor-pointer mr-2 transition"
                onClick={() => navigate(`/teams/${teamDocId}`)}
              >
                {teamName}
              </span>
              <span>팀</span>
            </div>
            <div className="mb-4">
              <div className="text-primary_dark text-lg mb-1">팀장</div>
              <div className="flex items-center text-white text-2xl font-bold">
                <div>{teamLeaderNickname}</div>
              </div>
            </div>
            <div>
              <div className="text-primary_dark text-lg mb-1">팀원</div>
              {members?.length === 0 && (
                <div className="text-white">팀원이 존재하지 않습니다</div>
              )}
              {members?.length > 0 &&
                members?.map((member) => (
                  <div
                    key={`m${member.memberSeq}`}
                    className="text-white text-2xl font-bold"
                  >
                    {member.memberNickname}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </TeamContainer>
    </React.Fragment>
  );
};

export default Team;

// styled
const TeamContainer = styled.div`
  border-radius: 0 10px 10px 0;
  height: 100%;
`;
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
