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
    return apiRequest("/ocr/user/me/subjects",
       { method: "GET" });
  },

//added by Rafael Maghinay October 2025
  getNotesBySubject: async (subjectId) => {
    return apiRequest(`/ocr/user/me/subjects/${subjectId}`, { method: "GET" });
  },
//end added by Rafael
};

export default notesService;
