package com.example.SmartStudyAI.services;

import com.example.SmartStudyAI.model.Notes;
import com.example.SmartStudyAI.model.Subject;
import com.example.SmartStudyAI.repositories.OcrTextFileRepo;
import com.example.SmartStudyAI.repositories.SubjectRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.net.http.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class OcrService {

    @Autowired
    OcrTextFileRepo ocrTextFileRepo;

    @Autowired
    SubjectRepository subjectRepository;

    private final HttpClient http = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${ocr.api.key}")
    private String OCR_KEY;

    public String extractText(String imageUrl, long subjectId) throws Exception {

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



    private String detectFileType(String url) {
        String lower = url.toLowerCase();
        if (lower.endsWith(".png")) return "PNG";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "JPG";
        if (lower.endsWith(".pdf")) return "PDF";
        if (lower.endsWith(".tif") || lower.endsWith(".tiff")) return "TIF";
        return ""; // unknown
    }

    public Notes extractTextFromFile(MultipartFile file, Long userId, Long subjectId)  {
        try {
            String extractedText = "";

            String fileName = file.getOriginalFilename();
            if (fileName.endsWith(".pdf")) {
                try (PDDocument document = PDDocument.load(file.getInputStream())) {
                    PDFTextStripper pdfTextStripper = new PDFTextStripper();
                    extractedText = pdfTextStripper.getText(document);
                }
            } else if (fileName.endsWith(".docx")) {
                try (XWPFDocument doc = new XWPFDocument(file.getInputStream())) {
                    List<XWPFParagraph> paragraphs = doc.getParagraphs();
                    StringBuilder sb = new StringBuilder();
                    for (XWPFParagraph para : paragraphs) {
                        sb.append(para.getText()).append("\n");
                    }
                    extractedText = sb.toString();
                }
            } else {
                throw new IllegalArgumentException("Unsupported file type!");
            }

            Notes notes = new Notes();
            notes.setUserId(userId);
            notes.setTitle(fileName);
            notes.setSubject(subjectId);
            notes.setContent(extractedText);
            ocrTextFileRepo.save(notes);
            return notes;
        }  catch (IOException e) {
            throw new RuntimeException("Error reading file: " + e.getMessage(), e);
        }
    }

    public Subject createSubject(String subjectName, long userId, String colorId) {
        Subject subject = new Subject();
        subject.setName(subjectName);
        subject.setUserId(userId);
        subject.setColorId(colorId);
        // Save the subject to the database (assuming you have a SubjectRepository)
        return subjectRepository.save(subject);
    }
}
