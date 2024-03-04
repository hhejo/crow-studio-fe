import api from "./api";

const editorApi = {
  apiRequest: (requestData) => api.post("/api-test", requestData),
  lint: (language, textCodeData) =>
    api.post(`/editors/lint/${language}`, textCodeData),
  formatPut: (language, codeData) =>
    api.post(`/editors/format/${language}`, codeData),
  formatGet: (language, fileNum) =>
    api.post(`/editors/format/read/${language}`, fileNum),
  variableRecommend: (letter) => api.post("/variable", letter),
  sendFormatRequest: (language, beforeFormatData) =>
    api.post(`/editors/format/${language}`, beforeFormatData),
  getFormatResult: (language, formatTicketData) =>
    api.post(`/editors/format/read/${language}`, formatTicketData),
};

export default editorApi;
