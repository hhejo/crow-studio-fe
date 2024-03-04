import api from "./api";

const fileApi = {
  fileCall: (fileData) => api.post("/files/files", fileData),
  getFileContent: (filePathData) => api.post("/files/files", filePathData),
  saveFileContent: (teamSeq, fileContentData) =>
    api.put(`/files/${teamSeq}/files`, fileContentData),
  createFile: (teamSeq, fileType, fileInfoData) =>
    api.post(`/files/${teamSeq}?type=${fileType}`, fileInfoData),
  renameFile: (teamSeq, renameData) =>
    api.put(`/files/${teamSeq}/file-title`, renameData),
  deleteFile: (teamSeq, fileType, filePathData) =>
    api.delete(`/files/${teamSeq}?type=${fileType}`, { data: filePathData }),
};

export default fileApi;
