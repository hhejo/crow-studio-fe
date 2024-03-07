import { IoClose } from "react-icons/io5";

const Teammate = (props) => {
  const { isLeader, teammateNickname, teammateDocId, removeTeammate } = props;
  const clickHandler = () => removeTeammate(teammateNickname, teammateDocId);

  return (
    <div className="flex flex-col items-center p-2">
      <div className="text-white text-sm flex items-center">
        {teammateNickname}
        {isLeader && (
          <IoClose
            className="cursor-pointer text-point_pink hover:text-point_red hover:scale-125 transition"
            onClick={clickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Teammate;
