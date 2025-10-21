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

  createNote: async (userId, subjectId, title, content) => {
  return apiRequest("/ocr/add-note", {
    method: "POST",
    body: JSON.stringify({ userId, subjectId, title, content }),
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

 deleteNote: async (id) => {
    return apiRequest(`/ocr/notes/${id}`, {
      method: "DELETE",
    });
  },

   uploadAndExtractText: async (file, subjectId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subjectId", subjectId);

    const response = await fetch("/ocr/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to extract text from file");
    return response.json();
  },
};



export default notesService;
