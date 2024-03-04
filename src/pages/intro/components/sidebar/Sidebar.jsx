import React, { useRef } from "react";
import styled from "styled-components";

// svg
import { ReactComponent as IcVar } from "../../../../assets/icons/ic_var.svg";

const Sidebar = ({ clickIcon, showComponent }) => {
  const classRef = useRef(null);

  const activeIconVar = showComponent === "Var" ? " activeIcon" : "";

  const clickHandler = (clickedName) => {
    const isActive = classRef.current.classList.contains("activeIcon");
    switch (clickedName) {
      case "Var":
        isActive || showComponent === "Var" ? clickIcon("") : clickIcon("Var");
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <SidebarContainer
        className="mb-3 bg-component_item_bg_dark overflow-auto"
        style={
          showComponent === ""
            ? { borderRadius: "10px" }
            : { borderRadius: "10px 0 0 10px" }
        }
      >
        <div>
          <ul className="pt-3.5">
            {/* Variable Name */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconVar}`}
              ref={classRef}
              onClick={() => clickHandler("Var")}
            >
              <IcSpan>
                <IcVar alt="variable name" />
              </IcSpan>
            </ListHover>
          </ul>
        </div>
      </SidebarContainer>
    </React.Fragment>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  border-radius: 10px 0 0 10px;
  width: 73px;
  min-width: 73px;
  max-width: 73px;
  height: 100%;
`;
// height: calc(100vh - 56.5px);
// border-left: 4px solid #d4a8e3;
const ListHover = styled.li`
  cursor: pointer;

  &:hover {
    margin: 0 5px 0 5px;
    border-radius: 10px;
    background-color: #786f7b;
    & svg {
      & path {
        fill: white;
      }
    }
  }
  &.activeIcon {
    margin: 0 5px 0 5px;
    border-radius: 10px;
    background-color: #786f7b;
    & svg {
      & path {
        fill: white;
      }
    }
  }
`;
const IcSpan = styled.span`
  padding: 15px 0px;
`;
