import api from "./api";

const compileApi = {
  getCompileResult: (compileData) => api.post("/compile/py", compileData),
  stopCompile: (teamData) => api.post("/compile/py/stop", teamData),
  getUnLoginCompileResult: (compileData) =>
    api.post("/unlogin/compile", compileData),
};

export default compileApi;
