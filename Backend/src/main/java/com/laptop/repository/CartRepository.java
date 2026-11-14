package com.laptop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptop.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserEmailAndProductId(
        String userEmail, Long productId
    );
    Optional<Cart> findByIdAndUserEmail(Long id, String userEmail);

    List<Cart> findByUserEmail(String userEmail);
}