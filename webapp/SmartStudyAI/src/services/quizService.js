import { apiRequest } from "./apiRequest.js";

export const quizService = {
  generate: async (subjectId, notesId) => {
    return apiRequest("/quizzes/generation", {
      method: "POST",
      body: JSON.stringify({ subjectId, notesId }),
    });
  },

  getUserQuizzes: async () => {
    return apiRequest("/quizzes/user/me", {
      method: "GET",
    });
  },

  getQuizQuestions: async (quizId) => {
    return apiRequest(`/quizzes/questions/${quizId}`, {
      method: "GET",
    });
  },

  submitQuizAnswers: async (quizId, answers) => {
    return apiRequest(`/quizzes/user/me/quiz/${quizId}/submit`, {
      method: "POST",
      body: JSON.stringify(answers),
    });
  },
};

export default quizService;