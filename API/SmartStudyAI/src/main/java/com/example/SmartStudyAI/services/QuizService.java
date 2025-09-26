package com.example.SmartStudyAI.services;

import com.example.SmartStudyAI.model.Quizzes;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class QuizService {
    private final RestTemplate restTemplate  = new RestTemplate();

    public Quizzes generateQuiz() {

        //get json from railway api
        String url = "https://smartstudyai-be-production.up.railway.app/ocr-to-quiz/pdf";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String json = response.getBody();

        System.out.println("JSON Response: " + json);
        Quizzes quiz = new Quizzes();

        return quiz;
    }
}
