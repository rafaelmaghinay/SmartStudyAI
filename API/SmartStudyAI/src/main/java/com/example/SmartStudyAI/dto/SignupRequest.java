package com.example.SmartStudyAI.dto;


import jakarta.validation.constraints.NotBlank;

public class SignupRequest {

    @NotBlank(message = "Name cannot be empty")
    public String name;

    @NotBlank(message = "Password cannot be empty")
    public String password;

    @NotBlank(message = "Email cannot be empty")
    public String email;
}
