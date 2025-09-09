package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quizzes, Long> {
}
