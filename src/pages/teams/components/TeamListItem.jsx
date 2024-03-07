import Member from "./Member";

const TeamListItem = ({ team, clickTeam }) => {
  const { teamDocId, teamName, leaderNickname, teammates } = team;

  const clickTeamListItemHandler = () => clickTeam(teamDocId);

  return (
    <div
      className="md:w-full w-[285px] flex items-center bg-component_item_bg_dark hover:cursor-pointer hover:scale-105 rounded-md transition"
      onClick={clickTeamListItemHandler}
    >
      <div className="md:w-48 w-32 text-white font-bold break-all bg-point_purple_op20 h-full p-2 flex items-center rounded-bl-md rounded-tl-md">
        {teamName}
      </div>
      <div className="flex md:flex-row flex-col">
        {/* 팀장 */}
        <Member isLeader={true} teamLeaderNickname={leaderNickname} />
        {/* 팀원들 */}
        <div className="flex md:flex-row flex-col">
          {teammates?.map((teammate) => (
            <Member
              key={`teammate${teammate.memberSeq}`}
              isLeader={false}
              memberNickname={teammate.memberNickname}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamListItem;
