package com.laptop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptop.dto.UserResponse;
import com.laptop.entity.Register;
import com.laptop.entity.Role;
import com.laptop.repository.RegisterRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminUserController {

    private final RegisterRepository registerRepository;

    public AdminUserController(RegisterRepository registerRepository) {
        this.registerRepository = registerRepository;
    }

    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {

        List<Register> users =
                registerRepository.findByRole(Role.USER);

        return users.stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getRole().name()
                ))
                .toList();
    }
}