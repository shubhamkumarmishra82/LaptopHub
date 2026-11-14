package com.laptop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.laptop.entity.Review;
import com.laptop.entity.ReviewStatus;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByUserId(Long userId);

    List<Review> findByStatus(ReviewStatus status);

    boolean existsByUserId(Long userId);
}