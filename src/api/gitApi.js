import api from "./api";

const gitApi = {
  gitBranch: (teamSeq, type, gitData) =>
    api.get(`/git/${teamSeq}/branches?type=${type}`, gitData),
  gitSwitch: (teamSeq, type, gitData) =>
    api.post(`/git/${teamSeq}/git-switch?type=${type}`, gitData),
  gitCommit: (teamSeq, commitData) =>
    api.post(`/git/${teamSeq}/git-commit`, commitData),
  gitPush: (userSeq, pushData) =>
    api.post(`/git/${userSeq}/git-push`, pushData),
  gitClone: (teamSeq) => api.post(`/git/${teamSeq}`),
};

export default gitApi;
