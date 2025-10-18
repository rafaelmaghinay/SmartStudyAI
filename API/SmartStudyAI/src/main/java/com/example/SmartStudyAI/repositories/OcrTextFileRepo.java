package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OcrTextFileRepo extends JpaRepository<Notes, Long> {
    List<Notes> findAllByUserIdAndSubjectId(Long userId, Long subjectId);
}
