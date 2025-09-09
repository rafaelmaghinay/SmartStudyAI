package com.example.SmartStudyAI.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank(message = "Email cannot be empty")
    public String email;

    @NotBlank(message = "Password cannot be empty")
    public String password;
}
