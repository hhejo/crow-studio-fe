// Router
import { useNavigate } from "react-router-dom";
// Styled
import styled from "styled-components";
// Icon
import { ReactComponent as IcAddTeam } from "../../../assets/icons/ic_addTeam.svg";

export const Team = (props) => {
  const navigate = useNavigate();
  const { teamDocId, myTeam, myTeammates } = props;
  const { teamName, leaderNickname } = myTeam;

  return (
    <section className="mb-3 bg-component_item_bg_dark flex flex-col overflow-auto h-full rounded-r-lg">
      {/* Team, 팀원 추가 아이콘 */}
      <div
        className="flex justify-between items-center"
        style={{ padding: 15 }}
      >
        <div className="text-xl font-bold text-white my-1">Team</div>
        <div className="mt-1 flex items-center">
          <IcSpan>
            <IcAddTeam className="h-[15px]" alt="IcAddTeam" />
          </IcSpan>
        </div>
      </div>

      {/* 줄 */}
      <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />

      {/* 팀 이름, 팀장, 팀원 */}
      <div style={{ padding: 15 }}>
        <div className="pl-1">
          {/* 팀 이름 */}
          <div className="mb-4 font-bold text-2xl">
            <span
              className="text-point_light_yellow font-bold hover:text-point_yellow cursor-pointer mr-2 transition"
              onClick={() => navigate(`/teams/${teamDocId}`)}
            >
              {teamName}
            </span>
            <span>팀</span>
          </div>

          {/* 팀장 */}
          <div className="mb-4 font-bold">
            <div className="text-primary_dark text-2xl mb-1">팀장</div>
            <div className="flex items-center text-white text-xl">
              <div>{leaderNickname}</div>
            </div>
          </div>

          {/* 팀원 */}
          <div className="mb-4 font-bold">
            <div className="flex items-center">
              <div className="text-primary_dark text-2xl mb-1">팀원</div>
              <span className="text-point_light_yellow text-sm px-1.5 py-0.5 mb-1">
                {myTeammates.length}
              </span>
            </div>
            {myTeammates.length > 0 ? (
              myTeammates.map((teammate) => (
                <div
                  key={`${teammate.docId}`}
                  className="text-white text-xl mb-1"
                >
                  {teammate.nickname}
                  <span className="ml-2 text-sm text-primary_-2_dark font-thin">
                    ({teammate.email})
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white font-normal text-sm">
                팀원이 존재하지 않습니다
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

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
