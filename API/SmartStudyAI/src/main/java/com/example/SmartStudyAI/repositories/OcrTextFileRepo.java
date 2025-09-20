package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OcrTextFileRepo extends JpaRepository<Notes, Long> {
}
