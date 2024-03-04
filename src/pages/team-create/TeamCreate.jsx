import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

import teamApi from "../../api/teamApi";
import api from "../../api/api";

import { startLoading, endLoading } from "../../redux/globalSlice";

import Header from "../../components/Header";
import Loading from "../../components/Loading";

const initialInputState = {
  teamName: "",
  projectType: "pure Python",
  teamGit: "",
};
const initialErrorState = {
  teamNameErrMsg: "",
  teamGitErrMsg: "",
};

// headlist listbox items
const pjtType = [
  { name: "pure Python" },
  { name: "Django" },
  { name: "Flask" },
  { name: "FastAPI" },
];

// const teamNameRegEx = /^[a-zA-Z0-9]{1,9}/g;

const TeamCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.global.value.isLoading);
  const [inputs, setInputs] = useState(initialInputState);
  const [errorMsgs, setErrorMsgs] = useState(initialErrorState);
  const { teamName, projectType, teamGit } = inputs;
  const { teamNameErrMsg, teamGitErrMsg } = errorMsgs;
  const [checkGit, setCheckGit] = useState(false);

  const inputChangeHandler = (e) => {
    if (e.name) {
      setInputs((prev) => {
        return { ...prev, projectType: e.name };
      });
    } else {
      if (e.target.name === "teamName") {
        setInputs((prev) => {
          return { ...prev, teamName: e.target.value };
        });
      } else if (e.target.name === "teamGit") {
        setInputs((prev) => {
          return { ...prev, teamGit: e.target.value };
        });
      } else if (e.target.name === "checkGit") {
        setCheckGit((prev) => !prev);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let isInvalid = false;
    setErrorMsgs(initialErrorState);
    if (teamName.trim().length === 0) {
      setErrorMsgs((prev) => {
        return { ...prev, teamNameErrMsg: "팀 이름을 입력하세요" };
      });
      isInvalid = true;
    }
    // console.log("teamNameRegEx.test(teamName):", teamNameRegEx.test(teamName));
    // if (teamNameRegEx.test(teamName)) {
    //   setErrorMsgs((prev) => {
    //     return {
    //       ...prev,
    //       teamNameErrMsg: "팀 이름은 영문대소문자, 숫자 1~9 글자입니다",
    //     };
    //   });
    //   isInvalid = true;
    // }
    if (
      teamName.trim() === "400" ||
      teamName.trim() === "403" ||
      teamName.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)
    ) {
      setErrorMsgs((prev) => {
        return { ...prev, teamNameErrMsg: "사용할 수 없는 팀 이름입니다" };
      });
      isInvalid = true;
    }
    if (checkGit) {
      if (teamGit.trim().length === 0) {
        setErrorMsgs((prev) => {
          return { ...prev, teamGitErrMsg: "팀 깃 주소를 입력하세요" };
        });
        isInvalid = true;
      }
    }
    if (isInvalid) {
      return;
    }

    // console.log("돌파");
    // console.log("isInvalid:", isInvalid);
    // console.log("teamName:", teamName);

    const teamData = {
      teamName,
      projectType,
      teamGit: checkGit ? teamGit : null,
    };
    setErrorMsgs(initialErrorState);
    dispatch(startLoading());
    teamApi
      .createTeam(teamData)
      .then(() => {
        navigate("/teams", { replace: true });
        dispatch(endLoading());
        toast.success("팀 생성 완료");
      })
      .catch((errorStatusCode) => {
        dispatch(endLoading());
        if (errorStatusCode === 409) {
          toast.warning("이미 해당 이름으로 생성된 팀이 있습니다");
        } else if (errorStatusCode.response.status === 404) {
          toast.warning("해당 깃 주소가 유효하지 않습니다");
        } else if (errorStatusCode.response.status === 403) {
          toast.warning("깃 계정과 연결되어있지 않습니다");
        } else {
          toast.error("Error");
          console.log(errorStatusCode);
        }
      });
  };

  const goTeamListHandler = () => navigate("/teams");

  // listbox
  const [selected, setSelected] = useState(pjtType[0]);

  const listboxChangeHandler = (e) => {
    setSelected(e);
    inputChangeHandler(e);
  };

  // 키보드입력제한
  const chkCharCode = (e) => {
    // const regExp = /[^0-9a-zA-Z]/g;
    // const ele = e.target;
    // if (regExp.test(ele.value)) {
    //   ele.value = ele.value.replace(regExp, "");
    // }
    if (e.key.match(/[^0-9a-zA-Z]/g)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
  };

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="flex flex-col w-full h-full">
          <Header />
          <div className="h-full flex flex-wrap justify-center items-center">
            <div
              data-aos="fade-in"
              className="mb-2 mx-2 xs:px-16 px-10 py-12 flex flex-col w-fit h-fit justify-center items-center border border-primary_-2_dark rounded-md overflow-auto"
            >
              <div className="text-4xl font-bold text-white pb-2 mb-5">
                팀 생성하기
              </div>
              <form
                method="post"
                onSubmit={submitHandler}
                className="flex flex-col items-center"
              >
                {/* 팀 이름 */}
                <div className="xs:w-80 w-[227.03px] mb-1">
                  <label htmlFor="teamName" className="">
                    팀 이름 (영문, 숫자)
                  </label>
                  <input
                    type="teamName"
                    id="teamName"
                    name="teamName"
                    pattern="[A-Za-z0-9]"
                    className="mt-1 w-full text-white bg-component_item_bg_+2_dark transition:bg-component_item_bg_+2_dark py-2 px-3 placeholder:text-gray-300 placeholder:text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple rounded-md transition"
                    placeholder="팀 이름을 입력하세요"
                    required
                    value={teamName}
                    onChange={inputChangeHandler}
                    onKeyDown={chkCharCode}
                  />
                  <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
                    {teamNameErrMsg}
                  </div>
                </div>

                {/* 프로젝트 종류 */}
                <div className="xs:w-80 w-auto mb-7">
                  {/* headlessui Listbox */}
                  <div className="">
                    <Listbox
                      name="projectType"
                      value={selected}
                      onChange={listboxChangeHandler}
                    >
                      <div className="relative mt-1">
                        <Listbox.Label>프로젝트 종류</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-component_item_bg_+2_dark text-white py-2 pl-3 pr-10 text-left shadow-md active:outline-none active:ring-2 active:ring-point_purple focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple">
                          <span className="block truncate">
                            {selected.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-point_purple"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-component_item_bg_+2_dark text-white py-1 text-base shadow-lg focus:outline-none">
                            {pjtType.map((type, typeIdx) => (
                              <Listbox.Option
                                key={typeIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-1.5 pl-10 pr-4 ${
                                    active ? "bg-point_purple_op20" : ""
                                  }`
                                }
                                value={type}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {type.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-point_purple">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                {/* 팀 깃 주소 */}
                <div className="xs:w-80 w-[226.03px] mb-4">
                  {/* 체크박스 */}
                  <input
                    type="checkbox"
                    id="checkGit"
                    name="checkGit"
                    className="bg-component_item_bg_+2_dark hover:bg-point_purple_op20 cursor-pointer border-3 border-primary-dark rounded checked:bg-point_purple text-point_purple focus:ring-0 mr-2"
                    defaultValue={checkGit}
                    onChange={inputChangeHandler}
                  />
                  <label htmlFor="teamGit" className="">
                    프로젝트 깃 주소
                    <span className="ml-3 text-sm text-primary_-2_dark">
                      체크박스
                    </span>
                  </label>
                  <input
                    type="text"
                    id="teamGit"
                    name="teamGit"
                    className="mt-1 w-full text-white py-2 px-3 bg-component_item_bg_+2_dark disabled:bg-component_-2_dark placeholder:text-gray-300 disabled:placeholder:text-component_item_bg_+2_dark placeholder:text-sm active:outline-none active:ring-2 active:ring-point_purple focus:outline-none focus:ring-2 focus:ring-point_purple focus:border-none rounded-md transition"
                    placeholder="프로젝트 깃 주소를 입력하세요"
                    disabled={!checkGit}
                    value={teamGit}
                    onChange={inputChangeHandler}
                  />
                  <div className="h-6 mt-1 ml-3 mb-0.5 text-sm text-point_pink">
                    {teamGitErrMsg}
                  </div>
                </div>

                {/* 팀 생성 버튼 */}
                <button
                  type="submit"
                  className="xs:w-80 w-[226.03px] text-lg font-bold text-component_dark bg-point_light_yellow hover:bg-point_yellow py-2 px-6 rounded-md transition mb-2"
                  onClick={submitHandler}
                >
                  팀 생성
                </button>
              </form>
              <button
                onClick={goTeamListHandler}
                className="xs:w-80 w-[226.03px] px-10 py-2 text-primary_dark bg-component_item_bg_dark border border-primary_-2_dark hover:bg-component_item_bg_+2_dark hover:text-white rounded-md transition"
              >
                팀 목록
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TeamCreate;
