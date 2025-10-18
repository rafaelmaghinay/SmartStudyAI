package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.dto.QuizRequest;
import com.example.SmartStudyAI.model.Questions;
import com.example.SmartStudyAI.model.Quizzes;
import com.example.SmartStudyAI.model.Users;
import com.example.SmartStudyAI.services.QuizService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/user/me")
    private List<Quizzes> getMyQuizzes(HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return quizService.getAllQuizzesByUserId(user.getId());
    }

    @GetMapping("/questions/{quizId}")
    private List<Questions> getQuestionsByQuizId(@PathVariable Long quizId) {
        return quizService.getQuestionsByQuizId(quizId);
    }

    @PostMapping("/user/me/quiz/{quizId}/submit")
    private int submitQuizAnswers(HttpSession session, @PathVariable Long quizId, @RequestBody List<Character> answers) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return quizService.calculateScore(user.getId(), quizId, answers);
    }
}
