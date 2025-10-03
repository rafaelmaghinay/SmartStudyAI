package com.example.SmartStudyAI.repositories;

import com.example.SmartStudyAI.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject findByName(String name);
    List<Subject> findAllByUserId(Long userId);
}
