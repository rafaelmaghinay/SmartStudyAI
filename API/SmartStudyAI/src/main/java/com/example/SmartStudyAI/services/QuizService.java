package com.example.SmartStudyAI.services;

import com.example.SmartStudyAI.model.*;
import com.example.SmartStudyAI.repositories.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

@Service
public class QuizService {
    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private OcrTextFileRepo ocrTextFileRepo;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuestionRepository questionsRepository;
    @Autowired
    private AnswerRepository answersRepository;
    @Autowired
    private QuizTakeRepository quizTakeRepository;

    public Quizzes saveQuizFromJson(String json, Long userId, Long notesId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode quizNode = root.path("quiz");

            // Save Quizzes
            Quizzes quiz = new Quizzes();
            quiz.setTitle(quizNode.path("title").asText());
            quiz.setNotesId(notesId);
            quiz.setUserId(userId);
            quiz.setCreatedAt(new Date());
            quiz = quizRepository.save(quiz);

            // Save Questions and Answers
            for (JsonNode qNode : quizNode.path("questions")) {
                Questions question = new Questions();
                question.setQuizId(quiz.getId());
                question.setQuestionText(qNode.path("question").asText());
                // Set options
                for (JsonNode opt : qNode.path("options")) {
                    String id = opt.path("id").asText();
                    String text = opt.path("text").asText();
                    switch (id) {
                        case "A": question.setOptionA(text); break;
                        case "B": question.setOptionB(text); break;
                        case "C": question.setOptionC(text); break;
                        case "D": question.setOptionD(text); break;
                    }
                }
                question.setCorrectOption(qNode.path("answer").asText());
                Questions savedQuestion = questionsRepository.save(question);
            }
            return quiz;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save quiz from JSON", e);
        }
    }

    public Quizzes generateQuiz(Long notesId, long userId) {
        Notes notes = ocrTextFileRepo.findById(notesId)
                .orElseThrow(() -> new IllegalArgumentException("Notes not found for id: " + notesId));
        String notesContent = notes.getContent();

        String url = "https://smartstudyai-be-production.up.railway.app/ai/generate-quiz";

        // Use ObjectMapper to safely serialize the JSON
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> body = new HashMap<>();
        body.put("notes", notesContent);
        String jsonBody;
        try {
            jsonBody = mapper.writeValueAsString(body);
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize JSON", e);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        String json = response.getBody();


        System.out.println("JSON Response: " + json);
        return saveQuizFromJson(json, userId, notesId);
    }

    public List<Quizzes> getAllQuizzesByUserId(Long userId) {
        return quizRepository.findAllByUserId(userId);
    }

    public List<Questions> getQuestionsByQuizId(Long quizId) {
        return questionsRepository.findAllByQuizId(quizId);
    }

    public int calculateScore(Long userId, Long quizId, List<Character> answers) {
        List<Questions> questions = questionsRepository.findAllByQuizId(quizId);
        QuizTakes quizTake = new QuizTakes();
        quizTake.setQuizId(quizId);
        quizTake.setUserId(userId);
        quizTake = quizTakeRepository.save(quizTake);
        Long quizTakeId = quizTake.getId();

        int score = 0;

        for (int i = 0; i < questions.size(); i++) {
            Questions question = questions.get(i);
            char correctOption = question.getCorrectOption().charAt(0);
            char userAnswer = answers.get(i);

            // Save user's answer
            Answers answer = new Answers();
            answer.setUserId(userId);
            answer.setQuizId(quizId);
            answer.setQuizTakeId(quizTakeId);
            answer.setQuestionId(question.getId());
            answer.setSelectedOption(String.valueOf(userAnswer));
            answersRepository.save(answer);

            if (userAnswer == correctOption) {
                score++;
            }
        }

        quizTake.setScore(score);
        quizTakeRepository.save(quizTake);
        return score;
    }

}
