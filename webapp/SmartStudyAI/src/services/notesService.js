import { apiRequest } from "./apiRequest.js";

export const notesService = {
  createSubject: async (name, color_id) => {
    return apiRequest("/ocr/add-subject", {
      method: "POST",
      body: JSON.stringify({
        subjectName: name,
        colorId: color_id,
      }),
    });
  },

  getSubjects: async () => {
    return apiRequest("/ocr/subjects", { method: "GET" });
  },

  getNotesBySubject: async (subjectId) => {
    return apiRequest(`/ocr/notes/${subjectId}`, { method: "GET" });
  },
};

export default notesService;
