import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

// import editorApi from "../../../../api/editorApi";

// styled
const VariableNameContainer = styled.div`
  border-radius: 0 10px 10px 0;
  height: 100%;
`;

const VariableName = () => {
  const [variable, setVariable] = useState("");
  const [result, setResult] = useState([]);
  const [resultActive, setResultActive] = useState(false);

  const update = (e) => {
    setVariable(() => e.target.value);
  };

  const clickHandler = (li) => navigator.clipboard.writeText(li);

  const rendering = () => {
    let show = [];
    result.map((li, index) =>
      show.push(
        <div
          key={`${index}`}
          data-aos="fade-in"
          className="mt-1 ml-[15px] text-xl text-white cursor-pointer hover:text-point_yellow transition"
          onClick={() => {
            clickHandler(li);
            toast.success("클립보드에 복사 완료");
          }}
        >
          {li}
        </div>
      )
    );
    return show;
  };

  const sendWord = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      data: variable,
    });
    // editorApi
    //   .variableRecommend(body)
    //   .then((res) => {
    //     setResultActive(() => true);
    //     setResult(() => res.data.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     toast.error("Error");
    //   });
  };

  return (
    <React.Fragment>
      <VariableNameContainer className="mb-3 bg-component_item_bg_dark flex flex-col  overflow-auto">
        <div
          className="flex justify-between items-center"
          style={{ padding: 15 }}
        >
          <div className="text-xl font-bold text-white my-1">변수명 추천</div>
        </div>
        <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />
        <div style={{ padding: 15 }}>
          <div className="pl-1">
            <div className="text-primary_dark text-sm font-bold">
              <form
                onSubmit={sendWord}
                className="flex justify-items-center items-center mb-3"
              >
                <input
                  type="text"
                  name="variable"
                  value={variable}
                  onChange={(e) => update(e)}
                  className="rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-sm font-medium text-white text-left appearance-none shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark"
                  placeholder="추천받고 싶은 단어 입력"
                  style={{ height: 28, width: 200 }}
                />
                <button
                  onClick={sendWord}
                  className="ml-2 w-[45px] h-[26px] bg-point_purple hover:bg-point_purple_-2 rounded-md text-white text-sm transition"
                >
                  추천
                </button>
              </form>
              {resultActive && rendering()}
            </div>
          </div>
        </div>
      </VariableNameContainer>
    </React.Fragment>
  );
};

export default VariableName;
