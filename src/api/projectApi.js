import api from "./api";

const projectApi = {
  getAllFiles: (teamSeq) => api.get(`/projects/directories/${teamSeq}`),
};

export default projectApi;
