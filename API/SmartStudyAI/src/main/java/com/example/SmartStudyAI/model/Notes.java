package com.example.SmartStudyAI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Notes {
    @Id
    private Long id;
    private Long userId;
    private String title;
    private String subject;

    @Lob
    private String content;

}
