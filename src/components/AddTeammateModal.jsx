// React
import { useState } from "react";
// Modal
import Modal from "react-modal";
// Icon
import { IoClose } from "react-icons/io5";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

// modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "auto",
    height: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    backgroundColor: "#3C3C3C",
    transform: "translate(-50%, -50%)",
  },
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
};

export const AddTeammateModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props;
  const { findTeammate, addTeammate, foundTeammates } = props;
  const [enteredTeammateNickname, setEnteredTeammateNickname] = useState("");

  let subtitle; // modal

  const findTeammateHandler = (e) => {
    e.preventDefault();
    if (enteredTeammateNickname.trim().length === 0) return;
    else if (enteredTeammateNickname.trim().length > 10) return;
    findTeammate(enteredTeammateNickname);
  };

  const addTeammateHandler = (teammateToAdd) => {
    const { docId, nickname } = teammateToAdd;
    setEnteredTeammateNickname("");
    setIsModalOpen(false);
    addTeammate({ docId, nickname });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onAfterOpen={() => (subtitle.style.color = "#fff")}
      onRequestClose={() => setIsModalOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-white font-bold"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          팀원 추가
        </h2>
        <IoClose
          className="cursor-pointer text-primary_dark text-xl ml-2"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm mr-2">유저검색</div>
          <form onSubmit={findTeammateHandler}>
            <input
              type="text"
              name="searchUser"
              id="searchUser"
              onChange={(e) => setEnteredTeammateNickname(e.target.value)}
              value={enteredTeammateNickname}
              className="rounded-md bg-component_item_bg_+2_dark px-4 py-1 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
            />
          </form>
        </div>
        <div>
          <div className="text-point_purple_op20 text-xs ml-14 mb-1">
            닉네임을 누르면 해당 유저가 팀에 추가됩니다.
          </div>
          {foundTeammates.map((teammate) => (
            <div
              key={`${teammate.docId}`}
              className="hover:cursor-pointer px-4 py-1 text-sm font-bold ml-14 rounded-md text-point_yellow hover:bg-point_yellow_+2 hover:text-black"
              onClick={() => addTeammateHandler(teammate)}
            >
              {teammate.nickname}
              <span className="ml-2 text-sm text-white">
                ({teammate.email})
              </span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
