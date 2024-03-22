// React
import { useRef } from "react";
// Tooltip
import ReactTooltip from "react-tooltip";
// Styled
import styled from "styled-components";
// Icon
import { ReactComponent as IcDirectory } from "../../../assets/icons/ic_dir.svg";
import { ReactComponent as IcEdit } from "../../../assets/icons/ic_edit.svg";
import { ReactComponent as IcGit } from "../../../assets/icons/ic_git.svg";
import { ReactComponent as IcTeam } from "../../../assets/icons/ic_team.svg";
import { ReactComponent as IcApi } from "../../../assets/icons/ic_api.svg";
import { ReactComponent as IcVar } from "../../../assets/icons/ic_var.svg";
import { ReactComponent as IcSettings } from "../../../assets/icons/ic_set.svg";

export const SidebarIcons = (props) => {
  const iconClassRef = useRef(null);
  const { clickIcon, lastClickedSidebarIcon: lastClicked } = props;
  const { goCodeShare } = props;
  const activeIconDir = lastClicked === "Dir" ? " activeIcon" : "";
  const activeIconGit = lastClicked === "Git" ? " activeIcon" : "";
  const activeIconTeam = lastClicked === "Team" ? " activeIcon" : "";
  const activeIconApi = lastClicked === "Api" ? " activeIcon" : "";
  const activeIconVar = lastClicked === "Var" ? " activeIcon" : "";
  const activeIconSet = lastClicked === "Set" ? " activeIcon" : "";

  // 아이콘 클릭
  const clickIconHandler = (clickedIconName) => {
    // activeIcon 클래스가 있으면 아이콘이 활성화된 아이콘으로 됨
    const active = iconClassRef.current.classList.contains("activeIcon");
    // 활성화된 아이콘을 또 누르면 해당 아이콘의 오른쪽 내용 창이 없어짐. 활성화되지 않았다면 그 아이콘을 활성화
    if (clickedIconName === "Dir")
      active || lastClicked === "Dir" ? clickIcon("") : clickIcon("Dir");
    else if (clickedIconName === "Git")
      active || lastClicked === "Git" ? clickIcon("") : clickIcon("Git");
    else if (clickedIconName === "Team")
      active || lastClicked === "Team" ? clickIcon("") : clickIcon("Team");
    else if (clickedIconName === "Api")
      active || lastClicked === "Api" ? clickIcon("") : clickIcon("Api");
    else if (clickedIconName === "Var")
      active || lastClicked === "Var" ? clickIcon("") : clickIcon("Var");
    else if (clickedIconName === "Set")
      active || lastClicked === "Set" ? clickIcon("") : clickIcon("Set");
    else if (clickedIconName === "Share")
      active || lastClicked === "Share" ? clickIcon("") : clickIcon("Share");
  };

  return (
    <Div
      className="mb-3 pt-3.5 bg-component_item_bg_dark overflow-auto"
      style={
        lastClicked === ""
          ? { borderRadius: "10px" } // 아이콘 모음 오른쪽 위아래 모서리
          : { borderRadius: "10px 0 0 10px" } // 아이콘 모음 오른쪽 위아래 모서리
      }
    >
      {/* Directory */}
      <ListHover
        className={`flex flex-col items-center py-0.5 ${activeIconDir}`}
        ref={iconClassRef}
        onClick={() => clickIconHandler("Dir")}
        data-tip="디렉토리"
      >
        <IcSpan>
          <IcDirectory alt="directory" />
        </IcSpan>
      </ListHover>

      {/* CodeShare */}
      <ListHover
        className={`flex flex-col items-center py-0.5`}
        ref={iconClassRef}
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
        ref={iconClassRef}
        onClick={() => clickIconHandler("Git")}
        data-tip="깃"
      >
        <IcSpan>
          <IcGit alt="git" />
        </IcSpan>
      </ListHover>

      {/* Team */}
      <ListHover
        className={`flex flex-col items-center py-0.5 ${activeIconTeam}`}
        ref={iconClassRef}
        onClick={() => clickIconHandler("Team")}
        data-tip="팀"
      >
        <IcSpan>
          <IcTeam alt="team" />
        </IcSpan>
      </ListHover>

      {/* API */}
      <ListHover
        className={`flex flex-col items-center py-0.5 ${activeIconApi}`}
        ref={iconClassRef}
        onClick={() => clickIconHandler("Api")}
        data-tip="API 테스트"
      >
        <IcSpan>
          <IcApi alt="api" />
        </IcSpan>
      </ListHover>

      {/* Variable Name */}
      <ListHover
        className={`flex flex-col items-center py-0.5 ${activeIconVar}`}
        ref={iconClassRef}
        onClick={() => clickIconHandler("Var")}
        data-tip="변수명 추천"
      >
        <IcSpan>
          <IcVar alt="variable name" />
        </IcSpan>
      </ListHover>

      {/* Settings */}
      <ListHover
        className={`flex flex-col items-center py-0.5 ${activeIconSet}`}
        ref={iconClassRef}
        onClick={() => clickIconHandler("Set")}
        data-tip="설정"
      >
        <IcSpan>
          <IcSettings alt="settings" />
        </IcSpan>
      </ListHover>
      <ReactTooltip place="right" />
    </Div>
  );
};

const Div = styled.div`
  border-radius: 10px 0 0 10px;
  width: 73px;
  min-width: 73px;
  max-width: 73px;
  height: 100%;
`;

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
