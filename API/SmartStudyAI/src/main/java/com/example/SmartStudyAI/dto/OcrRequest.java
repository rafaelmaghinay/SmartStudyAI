package com.example.SmartStudyAI.dto;

import jakarta.validation.constraints.NotNull;

public class OcrRequest {
    private String imageUrl;

    @NotNull(message = "User ID cannot be null")
    public long userId;

    // Getter & Setter
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
