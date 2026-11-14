package com.laptop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.laptop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByModelNumber(String modelNumber);
    List<Product> findByBrandIgnoreCase(String brand);
    List<Product> findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(
            String name, String brand
    );

}