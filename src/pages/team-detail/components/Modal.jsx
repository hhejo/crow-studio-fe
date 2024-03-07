const Modal = () => {
  return (
    <Modal
      isOpen={isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
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
          onClick={closeModal}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm mr-2">유저검색</div>
          <form onSubmit={submitSearchUserHandler}>
            <input
              type="text"
              name="searchUser"
              id="searchUser"
              onChange={searchUserChangeHandler}
              value={searchUserName}
              className="rounded-md bg-component_item_bg_+2_dark px-4 py-1 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
            />
          </form>
        </div>
        <div>
          <div className="text-point_purple_op20 text-xs ml-14 mb-1">
            닉네임을 누르면 해당 유저가 팀에 추가됩니다.
          </div>
          {searchResults?.map((user) => (
            <div
              key={user.userId}
              className="hover:cursor-pointer px-4 py-1 text-sm font-bold ml-14 rounded-md text-point_yellow hover:bg-point_yellow_+2 hover:text-black"
              onClick={() => addUserHandler(user.userSeq, user.userNickname)}
            >
              {user.userNickname}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Modal;
