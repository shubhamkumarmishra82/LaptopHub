package com.laptop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.laptop.dto.ProductRequestDto;
import com.laptop.service.ProductService;

@RestController
@RequestMapping("/api/admin/products")
public class ProductController {
    @Autowired
    private  ProductService productService;
    @PostMapping("/add")
    public ResponseEntity<String> addProduct(
            @ModelAttribute ProductRequestDto request) {

        String message = productService.addProduct(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }
}