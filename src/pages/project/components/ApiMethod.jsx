// React
import { Fragment, useState } from "react";
// UI
import { Combobox, Transition } from "@headlessui/react";
// Icon
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// Combobox items
const methods = [
  { id: 1, name: "GET" },
  { id: 2, name: "POST" },
  { id: 3, name: "PUT" },
  { id: 4, name: "DELETE" },
];

export const SelectMethod = ({ onMethodChange }) => {
  // 폰트 셀렉트 Combobox
  const [selected, setSelected] = useState(methods[0]);
  const [query, setQuery] = useState("");

  const filteredMethods =
    query === ""
      ? methods
      : methods.filter((method) =>
          method.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  if (setSelected) {
    const tempValue = selected.name;
    onMethodChange(tempValue);
  }

  return (
    <>
      {/* // <select onChange={onMethodChange} defaultValue="GET">
      //   <option value="GET">GET</option>
      //   <option value="POST">POST</option>
      //   <option value="PUT">PUT</option>
      //   <option value="DELETE">DELETE</option>
      // </select> */}
      {/* headless ui combobox */}
      <Combobox
        value={selected}
        onChange={setSelected}
        defaultValue="GET"
        className="mb-5"
      >
        <div className="relative mt-1">
          <div
            className="relative flex justify-between items-center rounded-md bg-component_item_bg_+2_dark px-1.5 py-2 text-xs font-medium text-white text-left shadow-sm hover:bg-point_purple_op20 active:outline-none active:ring-2 active:ring-point_purple"
            style={{ height: 26, width: 217 }}
          >
            <Combobox.Input
              className="border-none pr-4 py-1 text-xs font-medium text-white bg-transparent 
              focus:outline-none focus:border-none focus:ring-0"
              displayValue={(method) => method.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              // className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm"
              className="absolute left-[107px] z-10 mt-0.5 origin-top-right rounded-md bg-component_item_bg_+2_dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              style={{ height: 104, width: 217 }}
            >
              {filteredMethods.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-point-pink">
                  Nothing found.
                </div>
              ) : (
                filteredMethods.map((method) => (
                  <Combobox.Option
                    key={method.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-1 text-xs pl-10 pr-4 hover:bg-point_purple_op20 rounded-md ${
                        active
                          ? "bg-point_purple_op20 text-white"
                          : "text-white"
                      }`
                    }
                    value={method}
                    style={{
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {method.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "bg-point_purple_op20 text-point_purple"
                                : "text-white"
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-5 text-point_purple"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
};

// const SelectMethod = ({ onMethodChange }) => {
//   return (
//     <select onChange={onMethodChange} defaultValue="GET">
//       <option value="GET">GET</option>
//       <option value="POST">POST</option>
//       <option value="PUT">PUT</option>
//       <option value="DELETE">DELETE</option>
//     </select>
//   );
// };

// export default SelectMethod;
