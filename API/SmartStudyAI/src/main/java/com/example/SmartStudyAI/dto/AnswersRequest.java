package com.example.SmartStudyAI.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class AnswersRequest {

    @NotEmpty(message = "answers must not be empty")
    private List<String> answers;

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}
