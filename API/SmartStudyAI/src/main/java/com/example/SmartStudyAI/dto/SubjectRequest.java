package com.example.SmartStudyAI.dto;

import jakarta.validation.constraints.NotBlank;

public class SubjectRequest {
    @NotBlank(message = "Subject name cannot be empty")
    public String subjectName;

    @NotBlank(message = "Color ID cannot be empty")
    public String colorId;
}
