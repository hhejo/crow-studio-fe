import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled as muiStyled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderIcon from "@mui/icons-material/Folder";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import { IoLogoPython } from "react-icons/io5";
import { BsPencilFill } from "react-icons/bs";

import { ReactComponent as IcNewFile } from "../../../../assets/icons/ic_new_file.svg";
import { ReactComponent as IcNewDir } from "../../../../assets/icons/ic_new_dir.svg";
// import { ReactComponent as IcToggle } from "../../../../assets/icons/ic_toggle.svg";

import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import projectApi from "../../../../api/projectApi";
import fileApi from "../../../../api/fileApi";

import { selectFile } from "../../../../redux/teamSlice";

const [TYPE_FOLDER, TYPE_FILE, MENU_ID] = ["1", "2", "menu-id"];

// MySwal.fire SweetAlert 옵션
const alertOption = {
  showCancelButton: true,
  confirmButtonText: "네",
  cancelButtonText: "아니오",
  background: "#3C3C3C",
};

// filePath(nodeIds)를 받아 확장자가 무엇인지 확인하고 해당 파일 타입을 리턴
const getFileType = (filePath) => {
  const extension = filePath.split(".")[1] ?? null;
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
  // 파일인 경우
  if (filePath.includes(".")) return name.split(".")[0];
  // 폴더인 경우
  return name;
};

const Directory = (props) => {
  const dispatch = useDispatch();
  const { teamDocId, isLoading, editorRef, saveFileContent } = props;
  // const { selectedFilePath, selectedFileName, selectedFileType } = props;
  // const { goCodeShare } = props;
  const [filesDirectories, setFilesDirectories] = useState({});
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState("");

  const MySwal = withReactContent(Swal);
  const { show } = useContextMenu({ id: MENU_ID });

  // 디렉터리 받기
  useEffect(() => {
    const testData = {
      id: "src",
      name: "src-folder",
      children: [
        {
          id: "src/pages",
          name: "pages-folder",
          children: [
            { id: "src/pages/haha", name: "haha" },
            { id: "src/pages/yaho", name: "yaho" },
            { id: "src/pages/c.py", name: "c.py" },
          ],
        },
        { id: "src/app.py", name: "app.py" },
        { id: "src/b.md", name: " b.md" },
      ],
    };
    setFilesDirectories(testData);
    // projectApi
    //   .getAllFiles(teamDocId)
    //   .then((res) => {
    //     setFilesDirectories(res.data);
    //     const payloadData = {
    //       type: res.data.type,
    //       name: res.data.name,
    //       path: res.data.id,
    //     };
    //     if (res.data.type !== "folder") {
    //       dispatch(selectFile(payloadData));
    //     }
    //   })
    //   .catch(() => toast.error("디렉터리 로드 실패"));
    // return () => {
    //   const resetPayloadData = {
    //     type: "",
    //     name: "",
    //     path: "",
    //   };
    //   dispatch(selectFile(resetPayloadData));
    // };
  }, [dispatch, teamDocId]);

  // 디렉터리 생성
  const createDirectoryHandler = async () => {
    const newDirectoryName = await MySwal.fire({
      ...alertOption,
      title: "생성할 폴더 이름을 입력하세요",
      input: "text",
    });
    // if (!newDirectoryName.isConfirmed) {
    //   return;
    // }
    // if (newDirectoryName.value.length === 0) {
    //   toast.warning("폴더 이름을 입력해야합니다");
    //   return;
    // }
    // if (newDirectoryName.value.includes(".")) {
    //   toast.warning("폴더 이름에 .을 넣을 수 없습니다");
    //   return;
    // }
    // const fileInfoData = {
    //   fileTitle: newDirectoryName.value,
    //   filePath: selectedFilePath,
    // };
    // try {
    //   await fileApi.createFile(teamDocId, TYPE_FOLDER, fileInfoData);
    //   const res = await projectApi.getAllFiles(teamDocId);
    //   setFilesDirectories(res.data);
    //   toast.success("폴더 생성 성공");
    // } catch (err) {
    //   toast.error("폴더 생성 실패");
    // }
  };

  // 파일 생성
  const createFileHandler = async () => {
    const newFileName = await MySwal.fire({
      ...alertOption,
      title: "생성할 파일 이름(확장자까지)을 입력하세요",
      input: "text",
    });
    // if (!newFileName.isConfirmed) {
    //   return;
    // }
    // if (newFileName.value.length === 0) {
    //   toast.warning("파일 이름을 입력해야합니다");
    //   return;
    // }
    // if (!newFileName.value.includes(".")) {
    //   toast.warning("확장자까지 유효하게 입력해야 합니다");
    //   return;
    // }
    // const fileInfoData = {
    //   fileTitle: newFileName.value,
    //   filePath: selectedFilePath,
    // };
    // try {
    //   await fileApi.createFile(teamDocId, TYPE_FILE, fileInfoData);
    //   const res = await projectApi.getAllFiles(teamDocId);
    //   setFilesDirectories(res.data);
    //   toast.success("파일 생성 성공");
    // } catch (err) {
    //   toast.error("파일 생성 실패");
    // }
  };

  // 이름 변경
  const renameHandler = async () => {
    const oldFileName = "";
    // const oldFileName = selectedFilePath.split("/").slice(-1)[0];
    const newName = await Swal.fire({
      ...alertOption,
      title: "이름 변경",
      input: "text",
      inputValue: oldFileName,
    });
    // if (!newName.isConfirmed) {
    //   return;
    // }
    // if (newName.value.length === 0) {
    //   toast.warning("변경할 이름을 입력해야합니다");
    //   return;
    // }
    // if (newName === oldFileName) {
    //   return;
    // } else if (!newName) {
    //   return;
    // }
    // const renameData = {
    //   filePath: selectedFilePath,
    //   oldFileName,
    //   fileTitle: newName.value,
    // };
    // try {
    //   await fileApi.renameFile(teamDocId, renameData);
    //   const res = await projectApi.getAllFiles(teamDocId);
    //   setFilesDirectories(res.data);
    //   toast.success("이름 변경 성공");
    // } catch (err) {
    //   toast.error("이름 변경 실패");
    // }
  };

  // 삭제
  const deleteHandler = async () => {
    const selectedFileName = "테스트테스트";
    const res = await MySwal.fire({
      ...alertOption,
      title: `${selectedFileName}을(를) 삭제하시겠습니까?`,
    });
    // if (!res.isConfirmed) {
    //   return;
    // }
    // const filePathData = { filePath: selectedFilePath };
    // try {
    //   await fileApi.deleteFile(
    //     teamDocId,
    //     selectedFileType === "folder" ? TYPE_FOLDER : TYPE_FILE,
    //     filePathData
    //   );
    //   const res = await projectApi.getAllFiles(teamDocId);
    //   setFilesDirectories(res.data);
    //   const resetPayloadData = {
    //     type: "",
    //     name: "",
    //     path: "",
    //   };
    //   dispatch(selectFile(resetPayloadData));
    //   editorRef.current.getModel().setValue("");
    //   toast.success("파일 삭제 성공");
    // } catch (err) {
    //   console.error(err);
    //   toast.error("파일 삭제 실패");
    // }
  };

  // 저장
  const saveHandler = () => saveFileContent();

  // 노드 선택 (폴더, 파일 아이콘 선택)
  const nodeSelectHandler = (e, nodeIds) => {
    setSelectedFileName(getFileName(nodeIds));
    setSelectedFileType(getFileType(nodeIds));
    setSelectedFilePath(nodeIds);
    // const payloadData = { type: getFileType(nodeIds), name: getFileName(nodeIds), path: nodeIds };
    // dispatch(selectFile(payloadData));
  };

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

  function StyledTreeItem(props) {
    const {
      bgColor,
      color,
      labelIcon: LabelIcon,
      labelInfo,
      labelText,
      ...other
    } = props;

    return (
      <StyledTreeItemRoot
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
              pr: 0,
            }}
          >
            <Box
              component={LabelIcon}
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

  // const displayMenu = (e) => {
  //   show({ event: e });
  //   return e;
  // };
  const treeItemContextMenuHandler = (e, nodeIds) => {
    e.preventDefault();
    // displayMenu(e);
    show({ event: e });
  };

  // 트리 생성 with 스타일
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
      // color="#1a73e8"
      // bgColor="#e8f0fe"
      // onClick={treeItemClickHandler}
      onContextMenu={treeItemContextMenuHandler}
      collapseIcon={nodes?.id?.includes(".") ? null : <ExpandMoreIcon />}
      expandIcon={nodes?.id?.includes(".") ? null : <ChevronRightIcon />}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };

  return (
    <>
      {/* DirectoryContainer */}
      <DirectoryContainer className="mb-3 bg-component_item_bg_dark flex flex-col overflow-auto">
        <div className="justify-between items-center" style={{ padding: 15 }}>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xl font-bold text-white">Directory</div>
            <div className="mt-1 flex items-center">
              {/* 새 파일 생성 버튼 */}
              <IcSpan onClick={createFileHandler} data-tip="새 파일">
                <IcNewFile alt="IcNewFile" />
              </IcSpan>
              {/* 새 폴더 생성 버튼 */}
              <IcSpan onClick={createDirectoryHandler} data-tip="새 폴더">
                <IcNewDir className="mt-0.5" alt="IcNewDir" />
              </IcSpan>
              {/* 파일 저장 버튼 */}
              <IcSpan onClick={saveHandler} data-tip="파일 저장">
                <SaveIcon
                  className={isLoading && `animate-spin`}
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
            // defaultCollapseIcon={<ExpandMoreIcon />}
            // defaultExpandIcon={<ChevronRightIcon />}
            // onContextMenu={(e) => e.target.click()}
          >
            {renderTree(filesDirectories)}
          </TreeView>
          <div>
            <div>선택된 파일 이름: {selectedFileName}</div>
            <div>선택된 파일 타입: {selectedFileType}</div>
            <div>선택된 파일 경로: {selectedFilePath}</div>
          </div>
        </div>
      </DirectoryContainer>
      {/* Context Menu */}
      <Menu id={MENU_ID} className="contexify-crow">
        <Item onClick={renameHandler}>
          이름 변경 <BsPencilFill className="ml-1" />
        </Item>
        <Item onClick={deleteHandler}>삭제 ⌫</Item>
      </Menu>
    </>
  );
};

export default Directory;

const DirectoryContainer = styled.div`
  border-radius: 0 10px 10px 0;
  height: 100%;
`;

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
