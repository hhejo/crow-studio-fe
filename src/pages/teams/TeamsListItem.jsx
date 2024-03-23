export const TeamsListItem = (props) => {
  const { team, clickTeam } = props;
  const { teamDocId, teamName, leaderNickname, myTeammates } = team;

  return (
    <div
      className="md:w-full w-[285px] flex items-center bg-component_item_bg_dark hover:cursor-pointer hover:scale-105 rounded-md transition"
      onClick={() => clickTeam(teamDocId)}
    >
      <div className="md:w-48 w-32 text-white font-bold break-all bg-point_purple_op20 h-full p-2 flex items-center rounded-bl-md rounded-tl-md">
        {teamName}
      </div>
      <div className="flex md:flex-row flex-col">
        {/* 팀장 */}
        <div className="p-2">
          <div className="text-sm font-bold break-all text-point_light_yellow">
            {leaderNickname}
          </div>
        </div>

        {/* 팀원들 */}
        <div className="flex md:flex-row flex-col">
          {myTeammates.map((nickname, i) => (
            <div key={`${nickname}${i}`} className="p-2">
              <div className="text-sm break-all text-white">{nickname}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
