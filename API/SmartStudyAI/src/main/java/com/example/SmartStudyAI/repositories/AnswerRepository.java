package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Answers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answers, Long> {
}
