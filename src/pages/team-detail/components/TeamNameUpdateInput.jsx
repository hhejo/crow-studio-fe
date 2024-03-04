import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const TeamNameUpdateInput = (props) => {
  const { initialTeamName, submitTeamNameUpdate, closeTeamNameUpdate } = props;
  const [updatedTeamName, setUpdatedTeamName] = useState(initialTeamName);

  const inputTeamNameChangeHandler = (e) => setUpdatedTeamName(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    submitTeamNameUpdate(updatedTeamName);
  };

  return (
    <div data-aos="fade-in" className="flex items-center mr-2">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="inputTeamName"
          id="inputTeamName"
          className="rounded-md bg-component_item_bg_+2_dark md:w-auto w-[140px] mr-1 px-4 py-1 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
          defaultValue={initialTeamName}
          onChange={inputTeamNameChangeHandler}
        />
      </form>
      <IoClose
        className="cursor-pointer text-point_pink text-xl hover:text-point_red hover:scale-125 transition"
        onClick={closeTeamNameUpdate}
      />
    </div>
  );
};

export default TeamNameUpdateInput;
