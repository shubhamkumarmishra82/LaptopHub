package com.laptop.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
public class RegisterDto {
 @NotBlank(message="Email field is required")
 @Email(message="invalid Email formate")
 private String email;
 @NotBlank(message="password field is required")
 private String password;
 public String getEmail(){
	 return email;
 }
 public void  setEmail(String email) {
	 this.email = email;
 }
 public String getPassword(){
	 return password;
 }
 public void  setPassword(String password) {
	 this.password= password;
 }
 
}
