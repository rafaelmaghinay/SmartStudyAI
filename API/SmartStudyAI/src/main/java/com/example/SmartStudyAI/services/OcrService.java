package com.example.SmartStudyAI.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.net.http.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;

@Service
public class OcrService {

    private final HttpClient http = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${ocr.api.key}")
    private String OCR_KEY;

    public String extractText(String imageUrl) throws Exception {

        // Validate API key
        if (OCR_KEY == null || OCR_KEY.isBlank()) {
            throw new IllegalStateException("OCR API key is missing");
        }

        // Detect file type from URL
        String fileType = detectFileType(imageUrl);

        // Prepare request body
        String body = "url=" + URLEncoder.encode(imageUrl, StandardCharsets.UTF_8);
        if (!fileType.isBlank()) {
            body += "&filetype=" + fileType;
        }

        // Build HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.ocr.space/parse/image"))
                .header("apikey", OCR_KEY)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        // Send request
        HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());

        // Log full OCR response for debugging
        System.out.println("OCR.space response: " + response.body());

        // Parse JSON
        JsonNode root = mapper.readTree(response.body());
        JsonNode parsedResults = root.path("ParsedResults");

        if (parsedResults.isArray() && !parsedResults.isEmpty()) {
            JsonNode firstResult = parsedResults.get(0);
            JsonNode textNode = firstResult.path("ParsedText");
            if (!textNode.isMissingNode() && !textNode.asText().isBlank()) {
                return textNode.asText();
            } else {
                return "No text found in the image.";
            }
        } else {
            return "OCR failed or no results returned.";
        }
    }

    /**
     * Detect file type from URL extension for OCR.space
     */
    private String detectFileType(String url) {
        String lower = url.toLowerCase();
        if (lower.endsWith(".png")) return "PNG";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "JPG";
        if (lower.endsWith(".pdf")) return "PDF";
        if (lower.endsWith(".tif") || lower.endsWith(".tiff")) return "TIF";
        return ""; // unknown
    }
}
