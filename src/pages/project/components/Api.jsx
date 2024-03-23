// React
import { useRef, useState, useEffect } from "react";
// Toast
import { alertToast, toastType } from "../../../toast";
// Component
import { SelectMethod } from "./ApiMethod";

export const Api = () => {
  const [uri, setUri] = useState("");
  const [method, setMethod] = useState("");
  const [request, setRequest] = useState({});
  const [header, setHeader] = useState({});
  const [resultActive, setResultActive] = useState(false);
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");

  const onUriChange = (e) => {
    setUri(e.target.value);
    setTextareaHeightValue(e.target.value);
  };

  // const onMethodChange = (e) => {
  //   setMethod(e.target.value);
  // };
  const onMethodChange = (tempValue) => {
    setMethod(tempValue);
  };

  const update = (which, e) => {
    let jsonVariable = e.target.value;
    console.log(jsonVariable);
    if (which === "request") {
      setRequest(() => jsonVariable);
    } else {
      setHeader(() => jsonVariable);
    }
  };

  const sendApi = () => {
    alertToast(toastType.warning, "현재 지원하지 않는 기능");
    return;
    // const jsonRequest = JSON.parse(request);
    // const jsonHeader = JSON.parse(header);
    // if (jsonHeader["Content-Type"] === undefined) {
    //   jsonHeader["Content-Type"] = "application/json";
    // }
    // const body = {
    //   api: uri,
    //   type: method,
    //   request: jsonRequest,
    //   header: jsonHeader,
    // };
    // console.log(body);
    // //
    // //
    // editorApi
    //   .apiRequest(body)
    //   .then((res) => {
    //     setResultActive(() => true);
    //     setResult(() => JSON.stringify(res.data.data, null, 4));
    //     setTime(() => res.data.time);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     toast.error("Error");
    //   });
  };

  // 따로 컴포넌트를 받아서 거기서 데이터 가져올 때 작동시켜라고 했던 함수
  // const getList = (which, word) => {
  //   if (which === "request") {
  //     setRequest(() => word);
  //   } else {
  //     setHeader(() => word);
  //   }
  // };

  // 자동 높이 조절
  const textareaRef = useRef(null);
  const [textareaHeightValue, setTextareaHeightValue] = useState("");

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "28px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [textareaHeightValue]);

  // json pretty print
  const obj1 = { a: { b: { c: 10 } } };

  return (
    <section className="mb-3 bg-component_item_bg_dark flex flex-col overflow-auto h-full rounded-r-lg">
      <div
        className="flex justify-between items-center"
        style={{ padding: 15 }}
      >
        <div className="text-xl font-bold text-white my-1">API 테스트</div>
      </div>
      {/* stroke */}
      <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />
      {/*  */}
      <div style={{ padding: 15 }}>
        <div className="pl-1">
          <div className="text-primary_dark text-xl font-bold">
            <div className="mb-2">URI</div>
            {/* <input
                type="text"
                onChange={onUriChange}
                value={uri}
                placeholder="address"
                className="h-[28px] w-[217px] rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-sm font-medium text-white text-left break-all appearance-none shadow-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark mb-5"
              /> */}
            <textarea
              name="url"
              onChange={onUriChange}
              value={uri}
              placeholder="address"
              ref={textareaRef}
              className="h-[28px] w-[217px] rounded-md bg-component_item_bg_+2_dark px-4 py-1 text-sm font-medium text-white text-left break-all appearance-none shadow-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark mb-4 overflow-y-hidden resize-none"
            />
            <div className="mb-2">Method</div>
            <SelectMethod onMethodChange={onMethodChange} />
            <div className="mb-2">Request</div>
            {/* <KeyValue you="request" getList={getList}/> */}
            <textarea
              name="request"
              onChange={(e) => update("request", e)}
              placeholder='{ "key": "value" }'
              className="w-[253px] h-20 rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-sm font-medium text-white text-left appearance-none shadow-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark mb-4"
            ></textarea>
            <div className="mb-2">Header</div>
            {/* <KeyValue you="header" getList={getList}/> */}
            <div className="flex flex-col w-fit items-end">
              <textarea
                name="header"
                onChange={(e) => update("header", e)}
                placeholder='{ "key": "value" } // Content-Type, Authorization, etc...'
                className="w-[253px] h-20 rounded-md bg-component_item_bg_+2_dark px-4 py-2 text-sm font-medium text-white text-left appearance-none shadow-xs focus:border-none focus:outline-none focus:ring-2 focus:ring-point_purple placeholder:text-primary_dark mb-2"
              ></textarea>
              <button
                onClick={sendApi}
                className="h-[26px] w-[45px] rounded-md bg-point_purple hover:bg-point_purple_-2 text-white text-sm transition"
              >
                전송
              </button>
            </div>
            {resultActive && (
              <div className="mt-5">
                <div className="flex">
                  <div className="mr-4">소요시간 :</div>
                  <div className="text-point_yellow">{time / 1000}</div>
                  <div className="ml-1">초</div>
                </div>
                <div className="flex mb-5">
                  <div className="mr-4">결과 :</div>
                  <div className="w-[186px] h-auto break-all text-point_yellow">
                    <pre>{result}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
