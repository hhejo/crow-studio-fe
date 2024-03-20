import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import gitApi from "../../../../api/gitApi";
import { BsCircleFill } from "react-icons/bs";

const Git = (props) => {
  const [commitMsg, setCommitMsg] = useState(""); // 커밋 메시지
  const [newBranch, setNewBranch] = useState("");

  const [repoBranch, setRepoBranch] = useState([]);
  const [localBranch, setLocalBranch] = useState([]);
  const [callBell, setCallBell] = useState(0);
  const [nowBranch, setNowBranch] = useState("");
  const { selectedFilePath, teamDocId, docId } = props;

  useEffect(() => {
    // const body = { gitPath: selectedFilePath };
    // gitApi.gitBranch(teamDocId, 2, body).then((res) => setRepoBranch(() => res.data));
    // gitApi.gitBranch(teamDocId, 1, body).then((res) => setLocalBranch(() => res.data));
  }, [callBell, selectedFilePath, teamDocId]);

  const changeBranch = (event) => {
    const ChangingBranch = event.target.textContent;
    const pureBranch = ChangingBranch.replaceAll(" ", "").replace(
      "origin/",
      ""
    );
    const gitData = { branchName: pureBranch };
    // gitApi
    //   .gitSwitch(teamDocId, 1, gitData)
    //   .then(() => {
    //     setCallBell((prev) => prev + 1);
    //     setNowBranch(() => pureBranch);
    //     toast.success("깃 스위치 성공");
    //   })
    //   .catch(() => toast.error("깃 스위치 실패"));
  };

  const createNewBranchHandler = () => {
    if (newBranch.length === 0) {
      toast.warning("브랜치 이름을 입력하세요");
      return;
    }
    toast.success("신규 브랜치 생성 완료");
    setNewBranch("");
    // const gitData = { branchName: newBranchName };
    // gitApi
    //   .gitSwitch(teamDocId, 2, gitData)
    //   .then(() => {
    //     setCallBell((prev) => prev + 1);
    //     toast.success("신규 브랜치 생성 완료");
    //   })
    //   .catch(() => toast.error("잘못된 이름입니다"));
    // setNewBranchName("");
  };

  // Commit, Commit And Push
  const commitHandler = (type) => {
    if (commitMsg.length === 0) {
      toast.warning("Commit 메시지를 입력하세요");
      return;
    }
    if (type === "commit") toast.success("Commit 성공");
    else if (type === "commitAndPush") toast.success("Commit & Push 성공");
    setCommitMsg("");
    // const body = { message: commitMsg, filePath: "all" };
    // try {
    //   await gitApi.gitCommit(teamDocId, body);
    //   setCommitMsg(() => "");
    //   toast.success("커밋 성공");
    // } catch (err) {
    //   toast.error("커밋 실패");
    // }
    // 커밋앤푸시
    // const body = { message: commitMsg, teamDocId: teamDocId, filePath: "all", branchName: nowBranch };
    // gitApi
    //   .gitPush(docId, body)
    //   .then(() => {
    //     setCommitMsg("");
    //     toast.success("커밋&푸시 성공");
    //   })
    //   .catch(() => toast.error("커밋&푸시 실패"));
  };

  return (
    <div className="mb-3 bg-component_item_bg_dark flex flex-col h-full rounded-r-lg">
      {/* 타이틀 */}
      <div
        className="flex justify-between items-center"
        style={{ padding: 15 }}
      >
        <div className="text-xl font-bold text-white my-1">Git</div>
      </div>
      {/* 줄 */}
      <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />
      {/* 컨텐트 */}
      <div className="p-[15px] overflow-auto">
        <div className="pl-1">
          <div className="text-primary_dark text-sm font-bold">
            {/* Commit / Push */}
            <div className="w-fit mb-5">
              <div className="text-xl mb-2">Commit / Push</div>
              <textarea
                className="w-[253px] h-20 rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-sm font-medium text-white text-left appearance-none shadow-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark mb-2"
                style={{ resize: "none" }}
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="h-[26px] w-[70px] rounded-md bg-point_purple hover:bg-point_purple_-2 text-white mr-2 transition"
                  onClick={() => commitHandler("commit")}
                >
                  Commit
                </button>
                <button
                  className="h-[26px] w-[110px] rounded-md bg-point_purple hover:bg-point_purple_-2 text-white transition"
                  onClick={() => commitHandler("commitAndPush")}
                >
                  Commit & Push
                </button>
              </div>
            </div>
            {/* 줄 */}
            <hr className="bg-component_+2_dark border-0 m-0 h-[1px] min-h-[1px] w-[253px] mb-5" />
            {/* 새로운 브랜치 */}
            <details open className="mb-5 w-fit">
              <summary className="font-bold mb-2 text-xl cursor-pointer">
                새로운 브랜치
              </summary>
              <div className="flex">
                <input
                  className="h-[28px] w-[180px] rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-sm font-medium text-white text-left break-all appearance-none shadow-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark mb-2"
                  type="text"
                  onChange={(e) => setNewBranch(e.target.value)}
                  value={newBranch}
                />
                <button
                  className="h-[26px] w-[45px] rounded-md bg-point_purple hover:bg-point_purple_-2 text-white ml-2 transition"
                  onClick={createNewBranchHandler}
                >
                  생성
                </button>
              </div>
            </details>
            {/* 줄 */}
            <hr className="bg-component_+2_dark border-0 m-0 h-[1px] min-h-[1px] w-[253px] mb-5" />
            {/* Local Branch */}
            <details open className="mb-5 w-fit">
              <summary className="mb-2 text-xl cursor-pointer">
                Local Branch
              </summary>
              {localBranch.length === 0 && (
                <div className="text-white">로컬 브랜치 없음</div>
              )}
              {localBranch.length > 0 &&
                localBranch.map((branch, index) => {
                  return (
                    <div
                      className="flex items-center w-[233px] h-[26px] rounded-md hover:bg-point_purple_op20"
                      key={"local " + index}
                      onClick={(e) => changeBranch(e)}
                    >
                      <BsCircleFill
                        className={`text-point_purple ml-4 mr-3 ${
                          branch.includes("*") ? "" : "text-transparent"
                        }`}
                        size="0.5rem"
                      />
                      <div className="text-white font-normal">
                        {branch.includes("*")
                          ? branch.replace("*", "")
                          : branch}
                      </div>
                    </div>
                  );
                })}
            </details>
            {/* 줄 */}
            <hr className="bg-component_+2_dark border-0 m-0 h-[1px] min-h-[1px] w-[253px] mb-5" />
            {/* Repo Branch */}
            <details className="mb-5 w-fit">
              <summary className="mb-2 text-xl cursor-pointer">
                Repo Branch
              </summary>
              {repoBranch.length === 0 && (
                <div className="text-white">레포 브랜치 없음</div>
              )}
              {repoBranch.length > 0 &&
                repoBranch.map((branch, index) => {
                  return (
                    <div
                      className="flex items-center w-[233px] h-[26px] rounded-md hover:bg-point_purple_op20 overflow-x-auto"
                      key={"repo " + index}
                      onClick={(e) => changeBranch(e)}
                    >
                      <BsCircleFill
                        className={`text-point_purple  ml-4 mr-3 ${
                          branch.includes("*") ? "" : "text-transparent"
                        }`}
                        size="0.5rem"
                      />
                      <div className="text-white font-normal">{branch}</div>
                    </div>
                  );
                })}
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Git;
