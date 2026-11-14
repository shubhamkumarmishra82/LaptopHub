package com.laptop.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.laptop.dto.ProductRequestDto;
import com.laptop.entity.Product;
import com.laptop.exception.UserAlreadyExistsException;
import com.laptop.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private  ProductRepository productRepository;
public String addProduct(ProductRequestDto request) {

        // Check duplicate model number
        if (productRepository.existsByModelNumber(request.getModelNumber().trim())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, "Model number already exists"
            );
        }

        // Save image
        String imageUrl = saveImage(request.getImage());

        // Create Product object
        Product product = new Product();

        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setModelNumber(request.getModelNumber());
        product.setProcessor(request.getProcessor());
        product.setRam(request.getRam());
        product.setStorage(request.getStorage());
        product.setGraphics(request.getGraphics());
        product.setDisplay(request.getDisplay());
        product.setOperatingSystem(request.getOperatingSystem());
        product.setPrice(request.getPrice());

        // Discount optional hai, default 0
        product.setDiscount(
            request.getDiscount() == null ? 0 : request.getDiscount()
        );

        product.setStock(request.getStock());
        product.setWarranty(request.getWarranty());
        product.setDescription(request.getDescription());
        product.setImageUrl(imageUrl);

        // Save product in database
        productRepository.save(product);

        return "Product added successfully";
    }

    private String saveImage(MultipartFile image) {

        try {

            if (image == null || image.isEmpty()) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Please select product image"
                );
            }

            if (image.getSize() > 2 * 1024 * 1024) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Image size must be less than 2 MB"
                );
            }

            String contentType = image.getContentType();
            String extension;

            if ("image/jpeg".equals(contentType)) {
                extension = ".jpg";
            } else if ("image/png".equals(contentType)) {
                extension = ".png";
            } else if ("image/webp".equals(contentType)) {
                extension = ".webp";
            } else {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Only JPG, PNG and WEBP images allowed"
                );
            }

            // Create uploads folder
            Path folderPath = Paths.get("uploads");
            Files.createDirectories(folderPath);

            // Generate unique file name
            String fileName = UUID.randomUUID().toString() + extension;

            Path filePath = folderPath.resolve(fileName);

            // Copy image into folder
            Files.copy(image.getInputStream(), filePath);

            return "/uploads/" + fileName;

        } catch (IOException e) {
            throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "Image upload failed"
            );
        }
    }
    public Product getById(Long id){
    	Optional<Product> product = productRepository.findById(id);
    	if(product.isPresent()) {
    		return product.get();
    	}
    	else {
    		throw new UserAlreadyExistsException("Product Not Found");
    	}
    	
    }
    public List<Product> getAll(){
    	List<Product> product = productRepository.findAll();
    	if(product.isEmpty()) {
    		throw new UserAlreadyExistsException("Product Not Found");
    	}
    	else {
    		return product;
    	}
    }
    public List<Product> getProductsByBrand(String brand) {
        return productRepository.findByBrandIgnoreCase(brand);
    }
}