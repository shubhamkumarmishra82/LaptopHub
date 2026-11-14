package com.laptop.controller;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.laptop.dto.RegisterDto;
import com.laptop.entity.Register;
import com.laptop.repository.RegisterRepository;
import com.laptop.config.JwtUtil;
@RestController
@RequestMapping("/api/auth")
public class LoginController {
@Autowired 
private RegisterRepository registerRepo;
@Autowired 
private PasswordEncoder passwordEncoder;
@PostMapping("/login")
public ResponseEntity<?> loginVerify(@RequestBody RegisterDto registerdto){
Optional<Register> opt = registerRepo.findByEmail(registerdto.getEmail());
if(opt.isEmpty()) {
return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email is Invalid");
}
Register register = opt.get();
if(!passwordEncoder.matches(registerdto.getPassword(), register.getPassword())) {
return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("wrong password");
}
String token =  JwtUtil.generateToken(register.getEmail());
Map<String , Object> response = new HashMap<>();
response.put("user" , register.getEmail());
 response.put("role" , register.getRole());
 response.put("token" , token);
 return ResponseEntity.ok(response);
}

}
