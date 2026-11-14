package com.laptop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
	@NotBlank(message = "Name field is required")
	@Size(min = 3 , message = "name must be at least 3 character")
	private String name;
	@NotBlank(message = "Email field is required")
	@Email(message= "invalid email formate")
	private String email;
	@Size( min = 10 , max=10, message = "phone must be 10 digit")
	private String phone;
	@NotBlank(message = "password field is required")
	private String password;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
