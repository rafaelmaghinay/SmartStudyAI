package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.dto.QuizRequest;
import com.example.SmartStudyAI.model.Quizzes;
import com.example.SmartStudyAI.model.Users;
import com.example.SmartStudyAI.services.QuizService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
