import React, { useRef } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

// svg
import { ReactComponent as IcDirectory } from "../../../../assets/icons/ic_dir.svg";
import { ReactComponent as IcEdit } from "../../../../assets/icons/ic_edit.svg";
import { ReactComponent as IcGit } from "../../../../assets/icons/ic_git.svg";
import { ReactComponent as IcTeam } from "../../../../assets/icons/ic_team.svg";
import { ReactComponent as IcApi } from "../../../../assets/icons/ic_api.svg";
import { ReactComponent as IcVar } from "../../../../assets/icons/ic_var.svg";
import { ReactComponent as IcSettings } from "../../../../assets/icons/ic_set.svg";

const Sidebar = ({ clickIcon, showComponent, goCodeShare }) => {
  const classRef = useRef(null);
  const activeIconDir = showComponent === "Dir" ? " activeIcon" : "";
  const activeIconGit = showComponent === "Git" ? " activeIcon" : "";
  const activeIconShare = (showComponent = "Share" ? "activeIcon" : "");
  const activeIconTeam = showComponent === "Team" ? " activeIcon" : "";
  const activeIconApi = showComponent === "Api" ? " activeIcon" : "";
  const activeIconVar = showComponent === "Var" ? " activeIcon" : "";
  const activeIconSet = showComponent === "Set" ? " activeIcon" : "";

  const clickHandler = (clickedName) => {
    const isActive = classRef.current.classList.contains("activeIcon");
    switch (clickedName) {
      case "Dir":
        isActive || showComponent === "Dir" ? clickIcon("") : clickIcon("Dir");
        break;
      case "Git":
        isActive || showComponent === "Git" ? clickIcon("") : clickIcon("Git");
        break;
      case "Team":
        isActive || showComponent === "Team"
          ? clickIcon("")
          : clickIcon("Team");
        break;
      case "Api":
        isActive || showComponent === "Api" ? clickIcon("") : clickIcon("Api");
        break;
      case "Var":
        isActive || showComponent === "Var" ? clickIcon("") : clickIcon("Var");
        break;
      case "Set":
        isActive || showComponent === "Set" ? clickIcon("") : clickIcon("Set");
        break;
      case "Share":
        isActive || showComponent === "Share"
          ? clickIcon("")
          : clickIcon("Share");
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
            {/* Directory */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconDir}`}
              ref={classRef}
              onClick={() => clickHandler("Dir")}
              data-tip="디렉토리"
            >
              <IcSpan>
                <IcDirectory alt="directory" />
              </IcSpan>
            </ListHover>

            {/* CodeShare */}
            <ListHover
              className={`flex flex-col items-center py-0.5`}
              ref={classRef}
              onClick={() => goCodeShare()}
              data-tip="동시 편집"
            >
              <IcSpan>
                <IcEdit alt="settings" />
              </IcSpan>
            </ListHover>

            {/* Git */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconGit}`}
              ref={classRef}
              onClick={() => clickHandler("Git")}
              data-tip="깃"
            >
              <IcSpan>
                <IcGit alt="git" />
              </IcSpan>
            </ListHover>

            {/* Team */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconTeam}`}
              ref={classRef}
              onClick={() => clickHandler("Team")}
              data-tip="팀"
            >
              <IcSpan>
                <IcTeam alt="team" />
              </IcSpan>
            </ListHover>

            {/* API */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconApi}`}
              ref={classRef}
              onClick={() => clickHandler("Api")}
              data-tip="API 테스트"
            >
              <IcSpan>
                <IcApi alt="api" />
              </IcSpan>
            </ListHover>

            {/* Variable Name */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconVar}`}
              ref={classRef}
              onClick={() => clickHandler("Var")}
              data-tip="변수명 추천"
            >
              <IcSpan>
                <IcVar alt="variable name" />
              </IcSpan>
            </ListHover>

            {/* Settings */}
            <ListHover
              className={`flex flex-col items-center py-0.5 ${activeIconSet}`}
              ref={classRef}
              onClick={() => clickHandler("Set")}
              data-tip="설정"
            >
              <IcSpan>
                <IcSettings alt="settings" />
              </IcSpan>
            </ListHover>
            <ReactTooltip place="right" />
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
