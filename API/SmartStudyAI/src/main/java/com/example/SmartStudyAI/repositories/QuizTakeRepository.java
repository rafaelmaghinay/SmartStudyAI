package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.QuizTakes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizTakeRepository extends JpaRepository<QuizTakes, Long> {
    List<QuizTakes> findAllByUserId(Long userId);
}
