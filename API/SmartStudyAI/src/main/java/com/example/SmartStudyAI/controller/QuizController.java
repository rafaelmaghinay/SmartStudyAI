package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.model.Quizzes;
import com.example.SmartStudyAI.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/generate")
    private Quizzes generateQuiz() {
        quizService.generateQuiz();
        return new Quizzes();
    }
}
