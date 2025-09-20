package com.example.SmartStudyAI.controller;

import com.example.SmartStudyAI.dto.LoginRequest;
import com.example.SmartStudyAI.dto.SignupRequest;
import com.example.SmartStudyAI.model.Users;
import com.example.SmartStudyAI.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public Users signup(@Valid @RequestBody SignupRequest request){
        // Check if the username already exists
        if (userService.login(request.email, request.password) != null) {
            throw new IllegalArgumentException("Username already exists");
        }

        return userService.signup(request.name, request.password, request.email);
    }

    @PostMapping("/login")
    public Users login(@Valid @RequestBody LoginRequest request) {
        Users user = userService.login(request.email, request.password);
        if (user == null) throw new RuntimeException("Invalid credentials");
        return user;
    }

    @GetMapping("/user")
    public long userId(@RequestParam String email) {
        return userService.getIdByEmail(email);
    }
}
