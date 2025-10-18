package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.dto.QuizRequest;
import com.example.SmartStudyAI.model.Questions;
import com.example.SmartStudyAI.model.Quizzes;
import com.example.SmartStudyAI.model.Users;
import com.example.SmartStudyAI.services.QuizService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/generate")
    private Quizzes generateQuiz(@RequestBody QuizRequest request, HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        quizService.generateQuiz(request.notesId, user.getId());
        return new Quizzes();
    }

    @GetMapping("/user/{userId}")
    private List<Quizzes> getAllQuizzesByUserId(@PathVariable Long userId) {
        return quizService.getAllQuizzesByUserId(userId);
    }

    @GetMapping("/questions/{quizId}")
    private List<Questions> getQuestionsByQuizId(@PathVariable Long quizId) {
        return quizService.getQuestionsByQuizId(quizId);
    }

    @PostMapping("/user/{userId}/quiz/{quizId}/submit")
    private int submitQuizAnswers(@PathVariable Long userId, @PathVariable Long quizId, @RequestBody List<Character> answers) {
        return quizService.calculateScore(userId, quizId, answers);
    }
}
