package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Questions, Long> {
}
