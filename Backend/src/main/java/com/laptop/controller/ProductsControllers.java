package com.laptop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laptop.entity.Product;
import com.laptop.repository.ProductRepository;
import com.laptop.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductsControllers {
@Autowired 
private ProductService productService;
@Autowired
private ProductRepository productRepository;
@GetMapping("/all")
public List<Product> getAll(){
	return productService.getAll();
}
@GetMapping("/{id}")
public ResponseEntity<?> getById(@PathVariable Long id){
 
	Product product = productService.getById(id);
	return ResponseEntity.ok(product);
	
}
@GetMapping("/brand/{brand}")
public ResponseEntity<List<Product>> getProductsByBrand(
        @PathVariable String brand) {

    return ResponseEntity.ok(
        productService.getProductsByBrand(brand)
    );
}
@GetMapping("/search")
public List<Product> searchProducts(@RequestParam String keyword) {

    return productRepository
            .findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
                    keyword, keyword
            );
}
}
