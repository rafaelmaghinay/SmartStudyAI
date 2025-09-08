package com.example.SmartStudyAI.services;

import com.example.SmartStudyAI.model.Users;
import com.example.SmartStudyAI.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Users signup(String name, String password, String email) {
        Users user = new Users();
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole("USER");
        user.setCreatedAt(new java.util.Date());
        return userRepository.save(user);
    }

    public Users login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(null);
    }

    public Long getIdByEmail(String email) {
        Users user =  userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
