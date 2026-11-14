package com.laptop.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptop.dto.RegisterRequest;
import com.laptop.service.RegisterService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("api/auth")
public class RegisterController {
@Autowired
private RegisterService registerService;
@PostMapping("/user/register")
public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request){
	return new ResponseEntity<>(registerService.registerUser(request) , HttpStatus.OK);
}
@PostMapping("/admin/register")
public ResponseEntity<String> registerAdmin(@Valid @RequestBody RegisterRequest request){
	return new ResponseEntity<>(registerService.registerAdmin(request) , HttpStatus.OK);
}

}
