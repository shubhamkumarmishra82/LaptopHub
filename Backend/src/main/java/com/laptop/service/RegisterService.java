package com.laptop.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.laptop.dto.RegisterRequest;
import com.laptop.entity.Register;
import com.laptop.entity.Role;
import com.laptop.exception.UserAlreadyExistsException;
import com.laptop.repository.RegisterRepository;

@Service
public class RegisterService {
@Autowired 
private RegisterRepository registerRepo;
@Autowired 
private PasswordEncoder passwordEncoder;
Register register = new Register();

public String registerUser(RegisterRequest registerRequest) {
	if( registerRepo.findByEmail(registerRequest.getEmail().trim().toLowerCase()).isPresent()) {
		throw new UserAlreadyExistsException("Email already exists");
	}
	
	register.setName(registerRequest.getName());
	register.setEmail(registerRequest.getEmail().trim().toLowerCase());
	register.setPhone(registerRequest.getPhone());
	register.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
	register.setRole(Role.USER);
	registerRepo.save(register);
	
	return "User Registered Successfully";
}
public String registerAdmin(RegisterRequest registerRequest) {
	if( registerRepo.findByEmail(registerRequest.getEmail().trim().toLowerCase()).isPresent()) {
		throw new UserAlreadyExistsException("Email already exists");
	}
	
	register.setName(registerRequest.getName());
	register.setEmail(registerRequest.getEmail().trim().toLowerCase());
	register.setPhone(registerRequest.getPhone());
	register.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
	register.setRole(Role.ADMIN);
	registerRepo.save(register);
	
	return "Admin Registered Successfully";
}


}
