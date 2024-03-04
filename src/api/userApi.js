import api from "./api";

const userApi = {
  signup: (signupData) => api.post("/users/signup", signupData), // 회원가입
  login: (loginData) => api.post("/users/login", loginData), // 로그인
  getUser: () => api.get("/users/info"), // JWT에 해당하는 유저 정보 조희
  getMypage: (userSeq) => api.get(`/users/mypage/${userSeq}`), // userSeq의 해당 마이페이지 조회
  updateNickname: (updatedNicknameData) =>
    api.put("users/edit/nickname", updatedNicknameData), // 닉네임 변경
  updatePassword: (updatedPasswordData) =>
    api.put("users/edit/password", updatedPasswordData), // 비밀번호 변경
  resign: () => api.delete("/users/quit"), // 회원 탈퇴
  searchUser: (searchUserData) => api.post("/users/search", searchUserData), // 유저 검색
  updateGitAuth: (credentialsData) =>
    api.put("/users/edit/git", credentialsData), // 깃 토큰 변경
  getPersonalSetting: (teamSeq) => api.get(`/users/personal/${teamSeq}`),
  setPersonalSetting: (teamSeq, settingData) =>
    api.put(`/users/personal/${teamSeq}`, settingData),
  getUnLogin: () => api.get("/unlogin"),
};

export default userApi;
