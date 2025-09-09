package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.services.OcrService;
import com.example.SmartStudyAI.dto.OcrRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    private final OcrService ocrService;

    public OcrController(OcrService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping("/extract")
    public ResponseEntity<Map<String, Object>> extract(@RequestBody OcrRequest request) {
        try {
            if (request.getImageUrl() == null || request.getImageUrl().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("success", false, "error", "Missing required field: imageUrl"));
            }

            String text = ocrService.extractText(request.getImageUrl());

            return ResponseEntity.ok(Map.of("success", true, "text", text));

        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "OCR processing failed", "details", ex.getMessage()));
        }
    }

    @GetMapping("/test")
    public String test() {
        return "Spring Boot is running!";
    }

    @GetMapping("/ping")
    public String ping() {
        System.out.println("Ping endpoint called");
        return "pong";
    }
}
