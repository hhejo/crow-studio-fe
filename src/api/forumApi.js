import api from "./api";

const forumApi = {
  forumAll: () => api.get("/forum/read"),
  forumDetail: (boardSeq) => api.get(`/forum/read/${boardSeq}`),
  forumCreate: (forumInfo) => api.post("/forum", forumInfo),
  forumPut: (boardSeq, forumInfo) =>
    api.put(`/forum/read/${boardSeq}`, forumInfo),
  forumDelete: (boardSeq) => api.delete(`/forum/${boardSeq}`),
};

export default forumApi;
