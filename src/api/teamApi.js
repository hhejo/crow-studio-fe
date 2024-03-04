import api from "./api";

const teamApi = {
  getTeams: () => api.get("/teams"),
  getTeamDetail: (teamSeq) => api.get(`/teams/${teamSeq}`),
  createTeam: (teamData) => api.post("/teams/create", teamData),
  updateTeamName: (teamSeq, teamNameData) =>
    api.put(`/teams/modify/name/${teamSeq}`, teamNameData),
  deleteTeam: (teamSeq) => api.delete(`/teams/delete/${teamSeq}`),
  getMembers: (teamSeq) => api.get(`/teams/member/${teamSeq}`),
  addMember: (addData) => api.put("/teams/add", addData),
  deleteMember: (deleteData) =>
    api.delete("/teams/remove", { data: deleteData }),
  delegateLeader: (delegateData) => api.put("teams/beLeader", delegateData),
  resignTeam: (teamSeq) => api.delete(`teams/quit/${teamSeq}`),
  modifyProjectType: (teamSeq, modifiedData) =>
    api.put(`/teams/modify/type/${teamSeq}`, modifiedData),
};

export default teamApi;
