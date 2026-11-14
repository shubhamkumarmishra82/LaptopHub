
package com.laptop.controller;

import com.laptop.dto.ProfileDto;
import com.laptop.dto.ChangePasswordDTO;
import com.laptop.entity.Register;
import com.laptop.repository.RegisterRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/profile")
public class ProfileController {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // GET PROFILE
    @GetMapping
    public ResponseEntity<?> getProfile(Authentication authentication) {

        String email = authentication.getName();

        Optional<Register> user = registerRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Register register = user.get();

        ProfileDto dto = new ProfileDto();

        dto.setId(register.getId());
        dto.setName(register.getName());
        dto.setEmail(register.getEmail());
        dto.setPhone(register.getPhone());
        dto.setRole(register.getRole().name());

        return ResponseEntity.ok(dto);
    }


    // UPDATE NAME AND PHONE
    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestBody ProfileDto profileDto,
            Authentication authentication) {

        String email = authentication.getName();

        Optional<Register> user = registerRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Register register = user.get();

        register.setName(profileDto.getName());
        register.setPhone(profileDto.getPhone());

        registerRepository.save(register);

        return ResponseEntity.ok("Profile updated successfully");
    }


    // CHANGE PASSWORD
    @PutMapping("/password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordDTO passwordDTO,
            Authentication authentication) {

        String email = authentication.getName();

        Optional<Register> user = registerRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Register register = user.get();

 
        if (!passwordEncoder.matches(
                passwordDTO.getOldPassword(),
                register.getPassword())) {

            return ResponseEntity.badRequest()
                    .body("Old password is incorrect");
        }

        register.setPassword(
                passwordEncoder.encode(passwordDTO.getNewPassword()));

        registerRepository.save(register);

        return ResponseEntity.ok("Password changed successfully");
    }

}
