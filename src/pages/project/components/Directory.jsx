// React
import { useState, useEffect } from "react";
// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
// Styled
import styled from "styled-components";
// MUI
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled as muiStyled } from "@mui/material/styles";
// Prop Type
import PropTypes from "prop-types";
// Icon
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { IoLogoPython } from "react-icons/io5";
import { BsPencilFill } from "react-icons/bs";
import { ReactComponent as IcNewFile } from "../../../assets/icons/ic_new_file.svg";
import { ReactComponent as IcNewDir } from "../../../assets/icons/ic_new_dir.svg";
// Toast
import { toast } from "react-toastify";
// Sweet Alert
import { swalOptions, MySwal } from "../../../sweet-alert";
// Context Menu
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

// filePath(nodeIds)를 받아 확장자가 무엇인지 확인하고 해당 파일 타입을 리턴
const getFileType = (filePath) => {
  const extension = filePath.split(".")[1] ?? null;
  // 맵으로 변경하기
  if (extension === "py") return "python";
  else if (extension === "md") return "text";
  else if (extension === "html") return "html";
  else if (extension === "js") return "js";
  else if (extension === "css") return "css";
  else if (extension === null) return "folder";
  else return null;
};

// filePath(nodeIds)를 받아 해당 파일이나 폴더의 이름을 리턴
const getFileName = (filePath) => {
  const name = filePath.split("/").slice(-1)[0];
  if (filePath.includes(".")) return name.split(".")[0]; // 파일인 경우
  return name; // 폴더인 경우
};

export const Directory = (props) => {
  const { teamDocId, projectDocId, loading, saveFileContent } = props;
  const { selected, setSelected, editorRef } = props;
  const { myDirectory, setMyDirectory } = props;
  const { show } = useContextMenu({ id: "menu-id" });

  // 디렉토리에 폴더나 파일 추가하는 함수
  const addNewChildToNode = (nameToCreate) => {
    const { filePath, fileType } = selected;
    let destFilePath = "";
    if (fileType === "folder") destFilePath = filePath;
    else destFilePath = filePath.split("/").slice(0, -1).join("/");

    const addNewChildRecursively = (node) => {
      if (node.id === destFilePath) {
        if (!node.children) node.children = [];
        const newChild = {
          id: `${destFilePath}/${nameToCreate}`,
          name: nameToCreate,
        };
        console.log(newChild);
        node.children.push(newChild);
        return true;
      }
      if (node.children)
        for (let child of node.children)
          if (addNewChildRecursively(child)) return true;
      return false;
    };

    const updatedMyDirectory = { ...myDirectory };
    addNewChildRecursively(updatedMyDirectory);
    setMyDirectory(updatedMyDirectory);
  };

  // 폴더 생성 핸들러
  const createFolderHandler = async () => {
    const [title, input] = ["생성할 폴더 이름을 입력하세요", "text"];
    const result = await MySwal.fire({ ...swalOptions, title, input });
    if (!result.isConfirmed) return;
    const { value: nameToCreate } = result;
    if (nameToCreate.length === 0) {
      toast.warning("폴더 이름을 입력");
      return;
    } else if (nameToCreate.length > 20) {
      toast.warning("20자 이하로 입력");
      return;
    }
    if (nameToCreate.includes(".")) {
      toast.warning("폴더 이름에 점(.)을 넣을 수 없음");
      return;
    }
    addNewChildToNode(nameToCreate);
    try {
      const projectsDocRef = doc(firestore, "projects", projectDocId);
      const updateDirectoryField = { directory: myDirectory };
      await updateDoc(projectsDocRef, updateDirectoryField); // directory 필드 덮어쓰기
      toast.success("폴더 생성 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 파일 생성 핸들러
  const createFileHandler = async () => {
    const [title, input] = ["생성할 파일 이름(확장자까지)을 입력", "text"];
    const result = await MySwal.fire({ ...swalOptions, title, input });
    if (!result.isConfirmed) return;
    const { value: nameToCreate } = result;
    if (nameToCreate.length === 0) {
      toast.warning("파일 이름을 입력");
      return;
    } else if (nameToCreate.length > 20) {
      toast.warning("20자 이하로 입력");
      return;
    }
    if (!nameToCreate.includes(".")) {
      toast.warning("확장자까지 유효하게 입력해야 함");
      return;
    }
    addNewChildToNode(nameToCreate);
    try {
      const projectsDocRef = doc(firestore, "projects", projectDocId);
      const updateDirectoryField = { directory: myDirectory };
      await updateDoc(projectsDocRef, updateDirectoryField); // directory 필드 덮어쓰기
      toast.success("파일 생성 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 이름 변경 핸들러
  const renameFileHandler = async () => {
    const [title, input] = ["이름 변경", "text"];
    const inputValue = selected.filePath.split("/").at(-1);
    const res = await MySwal.fire({ ...swalOptions, title, input, inputValue });
    if (!res.isConfirmed) return;
    const { value: nameToUpdate } = res;
    if (nameToUpdate.length === 0) {
      toast.warning("변경할 이름을 입력해야 함");
      return;
    } else if (nameToUpdate.length > 20) {
      toast.warning("20자 이하로 입력");
      return;
    }
    if (selected.fileType === "folder") {
      if (nameToUpdate.includes(".")) {
        toast.warning("폴더 이름에 점(.)을 넣을 수 없음");
        return;
      }
    } else {
      if (!nameToUpdate.includes(".")) {
        toast.warning("확장자까지 유효하게 입력해야 함");
        return;
      }
    }
    if (nameToUpdate === selected.fileName) return;
    else if (!nameToUpdate) return;
    const updateNodeNameById = (nodeId, nameToUpdate) => {
      const updateNodeNameRecursively = (node) => {
        if (!node.children) return false;
        for (let child of node.children) {
          if (child.id === nodeId) {
            child.name = nameToUpdate;
            child.id = `${nodeId
              .split("/")
              .slice(0, -1)
              .join("/")}/${nameToUpdate}`;
            return true;
          }
          if (updateNodeNameRecursively(child)) return true;
        }
        return false;
      };
      const updatedMyDirectory = { ...myDirectory };
      updateNodeNameRecursively(updatedMyDirectory);
      setMyDirectory(updatedMyDirectory);
    };
    updateNodeNameById(selected.filePath, nameToUpdate);
    try {
      const projectsDocRef = doc(firestore, "projects", projectDocId);
      const updateDirectoryField = { directory: myDirectory };
      await updateDoc(projectsDocRef, updateDirectoryField); // directory 필드 덮어쓰기
      setSelected({ fileName: "", fileType: "", filePath: "" });
      toast.success("이름 변경 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제 핸들러
  const deleteHandler = async () => {
    const target = selected.filePath.split("/").at(-1);
    const title = `${target}을(를) 삭제하시겠습니까?`;
    const result = await MySwal.fire({ ...swalOptions, title });
    if (!result.isConfirmed) return;
    const removeNodeById = (nodeId) => {
      const removeNodeRecursively = (node) => {
        if (!node.children) return false;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.id === nodeId) {
            node.children.splice(i, 1);
            return true;
          }
          if (removeNodeRecursively(child)) return true;
        }
        return false;
      };
      const updatedMyDirectory = { ...myDirectory };
      removeNodeRecursively(updatedMyDirectory);
      setMyDirectory(updatedMyDirectory);
    };
    removeNodeById(selected.filePath);
    try {
      const projectsDocRef = doc(firestore, "projects", projectDocId);
      const updateDirectoryField = { directory: myDirectory };
      await updateDoc(projectsDocRef, updateDirectoryField); // directory 필드 덮어쓰기
      setSelected({ fileName: "", fileType: "", filePath: "" });
      toast.success("삭제 성공");
    } catch (error) {
      console.error(error);
    }
  };

  // 파일 내용 저장 핸들러
  const saveFileContentHandler = () => {
    console.log(editorRef.current.getModel().getValue());
    // saveFileContent()
  };

  // 노드 선택 (폴더, 파일 아이콘 선택) 핸들러
  const nodeSelectHandler = (e, nodeIds) => {
    const changeTo = {
      fileName: getFileName(nodeIds),
      fileType: getFileType(nodeIds),
      filePath: nodeIds,
    };
    setSelected(changeTo);
  };

  // StyledTreeItemRoot
  const StyledTreeItemRoot = muiStyled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: "#BBBBBB",
      borderTopRightRadius: theme.spacing(1),
      borderBottomRightRadius: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderTopLeftRadius: theme.spacing(1),
      borderBottomLeftRadius: theme.spacing(1),
      paddingLeft: theme.spacing(0),
      fontWeight: theme.typography.fontWeightMedium,
      "&:hover": { backgroundColor: "white", color: "#D4A8E3" },
      "&.Mui-selected": {
        backgroundColor: "#786f7b",
        color: "white",
        fontWeight: "bold",
      },
      "&.Mui-selected:hover": { backgroundColor: "#D4A8E3" },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: "inherit",
        color: "inherit",
      },
      [`& .${treeItemClasses.iconContainer}`]: {},
    },
    [`& .${treeItemClasses.group}`]: {},
  }));

  // 파일, 폴더 아이콘 각 하나를 나타내는 스타일 적용된 트리 아이템
  function StyledTreeItem(props) {
    const { bgColor, color, labelIcon, labelInfo, labelText, ...other } = props;
    return (
      <StyledTreeItemRoot
        label={
          <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
            <Box
              component={labelIcon}
              color="inherit"
              sx={{ mr: 1, width: 20, height: "auto" }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "inherit",
                flexGrow: 1,
                fontSize: 14,
                width: "100%",
              }}
            >
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
        }
        style={{ "--tree-view-color": color, "--tree-view-bg-color": bgColor }}
        {...other}
      />
    );
  }

  // propTypes
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };

  // 스타일 적용된 트리 생성 함수
  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      labelText={nodes.name}
      labelIcon={
        nodes?.id?.includes(".")
          ? nodes?.id?.includes(".py")
            ? IoLogoPython
            : DescriptionIcon
          : FolderIcon
      }
      onContextMenu={contextMenuHandler}
      collapseIcon={nodes?.id?.includes(".") ? null : <ExpandMoreIcon />}
      expandIcon={nodes?.id?.includes(".") ? null : <ChevronRightIcon />}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  // 파일, 폴더 아이콘 오른쪽 클릭 컨텍스트 메뉴
  const contextMenuHandler = (e) => {
    e.preventDefault();
    show({ event: e });
  };

  return (
    <div className="mb-3 bg-component_item_bg_dark flex flex-col overflow-auto h-full rounded-r-lg">
      {/* 디렉터리, 파일 생성 버튼튼 폴더 생성 버튼, 저장 버튼 */}
      <div className="justify-between items-center" style={{ padding: 15 }}>
        <div className="flex items-center justify-between gap-4">
          <div className="text-xl font-bold text-white">Directory</div>
          <div className="mt-1 flex items-center">
            {/* 새 파일 생성 버튼 */}
            <IcSpan onClick={createFileHandler} data-tip="새 파일">
              <IcNewFile alt="IcNewFile" />
            </IcSpan>
            {/* 새 폴더 생성 버튼 */}
            <IcSpan onClick={createFolderHandler} data-tip="새 폴더">
              <IcNewDir className="mt-0.5" alt="IcNewDir" />
            </IcSpan>
            {/* 파일 저장 버튼 */}
            <IcSpan onClick={saveFileContentHandler} data-tip="파일 저장">
              <SaveIcon
                className={loading && `animate-spin`}
                sx={{ fontSize: 20 }}
              />
            </IcSpan>
          </div>
        </div>
      </div>
      {/* stroke */}
      <hr className="bg-component_dark border-0 m-0 h-[3px] min-h-[3px]" />
      {/* 디렉터리 파일, 폴더 모음 트리 뷰 */}
      <div className="text-xs" style={{ padding: 15 }}>
        <TreeView
          aria-label="files and directories"
          defaultExpanded={["root"]}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          onNodeSelect={nodeSelectHandler}
        >
          {renderTree(myDirectory)}
        </TreeView>
      </div>
      {/* Context Menu */}
      <Menu id={"menu-id"} className="contexify-crow">
        <Item onClick={renameFileHandler}>
          이름 변경 <BsPencilFill className="ml-1" />
        </Item>
        <Item onClick={deleteHandler}>삭제 ⌫</Item>
      </Menu>
    </div>
  );
};

const IcSpan = styled.span`
  width: 34px;
  height: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbbbbb;
  &:hover {
    background-color: #d9d9d9;
    border-radius: 5px;
    & svg {
      & path {
        fill: #2b2c2b;
      }
    }
  }
`;
