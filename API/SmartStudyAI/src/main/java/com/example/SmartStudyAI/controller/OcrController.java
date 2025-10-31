package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.dto.SubjectRequest;
import com.example.SmartStudyAI.model.Notes;
import com.example.SmartStudyAI.model.Subject;
import com.example.SmartStudyAI.services.OcrService;
import com.example.SmartStudyAI.dto.OcrRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.SmartStudyAI.model.Users;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    private final OcrService ocrService;

    public OcrController(OcrService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping("/extract")
    public ResponseEntity<Map<String, Object>> extract(@Valid @RequestBody OcrRequest request) {
        try {
            if (request.getImageUrl() == null || request.getImageUrl().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("success", false, "error", "Missing required field: imageUrl"));
            }

            String text = ocrService.extractText(request.getImageUrl(), request.subjectId);

            return ResponseEntity.ok(Map.of("success", true, "text", text));

        } catch (IllegalStateException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "OCR processing failed", "details", ex.getMessage()));
        }
    }

    @PostMapping("/upload")
    public Notes uploadAndExtractText(@RequestParam("file") MultipartFile file, HttpSession session, @RequestParam("subjectId") Long subjectId) throws Exception {
        Users user = (Users) session.getAttribute("user");
        return ocrService.extractTextFromFile(file, user.getId(), subjectId);
    }

    @PostMapping("/add-subject")
    public Subject createSubject(@Valid @RequestBody SubjectRequest subjectRequest, HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        return ocrService.createSubject(subjectRequest.subjectName, user.getId(), subjectRequest.colorId);
    }

    @PostMapping("/add-note")
    public Notes addNote(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        Long subjectId = Long.valueOf(body.get("subjectId").toString());
        String title = body.get("title").toString();
        String content = body.get("content").toString();
        return ocrService.createNote(userId, subjectId, title, content);
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<Map<String, Object>> updateNote(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        try {
            String title = body.get("title");
            String content = body.get("content");

            Notes updatedNote = ocrService.updateNote(id, title, content);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "note", updatedNote
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "error", "Failed to update note"));
        }
    }

    @GetMapping("user/me/subjects")
    public ResponseEntity<?> getAllSubjectsByUserId(HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        Long userId = user.getId();
        return ResponseEntity.ok(ocrService.getAllSubjectsByUserId(userId));
    }

    @GetMapping("user/me/subjects/{subjectId}")
    public List<Notes> getAllNotesBySubjectId(HttpSession session, @PathVariable Long subjectId) {
        Users user = (Users) session.getAttribute("user");
        Long userId = user.getId();
        return ocrService.getAllNotesBySubjectId(userId, subjectId);
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<?> deleteNoteById(@PathVariable Long id) {
        try {
            ocrService.deleteNoteById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Note deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<?> deleteSubjectById(@PathVariable Long id) {
        try {
            ocrService.deleteSubjectById(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Subject deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }



    /*@GetMapping("/test")
    public String test() {
        return "Spring Boot is running!";
    }

    @GetMapping("/ping")
    public String ping() {
        System.out.println("Ping endpoint called");
        return "pong";
    }
    */
}
