package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Questions, Long> {
    List<Questions> findAllByQuizId(Long quizId);
}
