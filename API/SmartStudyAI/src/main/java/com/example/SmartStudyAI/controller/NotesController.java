package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.repositories.OcrTextFileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    @Autowired
    private OcrTextFileRepo ocrTextFileRepo;

}
