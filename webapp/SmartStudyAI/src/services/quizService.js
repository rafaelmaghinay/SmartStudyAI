import { apiRequest } from "./apiRequest.js";

export const quizService = {
  generate: async (subjectId, notesId) => {
    return apiRequest("/quizzes/generate", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (name, email, password) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
};

export default quizService;