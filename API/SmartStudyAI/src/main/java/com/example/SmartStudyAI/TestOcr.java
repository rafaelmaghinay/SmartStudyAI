package com.example.SmartStudyAI;

import java.net.*;
import java.net.http.*;
import java.nio.charset.StandardCharsets;

public class TestOcr {
    public static void main(String[] args) throws Exception {
        String apiKey = "K83091529088957";
        String imageUrl = "https://wallup.net/wp-content/uploads/2015/06/abstract-minimalistic-text-typography-grayscale-focused-into-newspaper.jpg";

        String body = "url=" + URLEncoder.encode(imageUrl, StandardCharsets.UTF_8);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.ocr.space/parse/image"))
                .header("apikey", apiKey)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.statusCode());
        System.out.println(response.body());
    }
}
