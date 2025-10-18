import { apiRequest } from "./apiRequest.js";

export const quizService = {
  generate: async (subjectId, notesId) => {
    return apiRequest("/quizzes/generate", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  getQuiz: async (name, email, password) => {
    return apiRequest("/quizzes/user/me", {
      method: "GET",
    });
  },
};

export default quizService;