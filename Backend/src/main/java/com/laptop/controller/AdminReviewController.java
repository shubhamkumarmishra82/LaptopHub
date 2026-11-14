package com.laptop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.laptop.dto.AdminReviewRequest;
import com.laptop.dto.ReviewResponse;
import com.laptop.entity.Register;
import com.laptop.entity.Review;
import com.laptop.entity.ReviewStatus;
import com.laptop.repository.RegisterRepository;
import com.laptop.repository.ReviewRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminReviewController {

    private final ReviewRepository reviewRepository;
    private final RegisterRepository registerRepository;

    public AdminReviewController(ReviewRepository reviewRepository,
            RegisterRepository registerRepository) {
        this.reviewRepository = reviewRepository;
        this.registerRepository = registerRepository;
    }

    private ReviewResponse convertToResponse(Review review) {

        Register user = registerRepository.findById(review.getUserId())
                .orElse(null);

        return new ReviewResponse(
                review.getId(),
                review.getUserId(),
                user != null ? user.getName() : "Unknown User",
                review.getRating(),
                review.getComment(),
                review.getStatus(),
                review.getAdminRemark(),
                review.getCreatedAt()
        );
    }

    // ADMIN: GET ALL REVIEWS
    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {

        List<ReviewResponse> reviews = reviewRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();

        return ResponseEntity.ok(reviews);
    }

    // ADMIN: APPROVE OR REJECT REVIEW
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateReviewStatus(
            @PathVariable Long id,
            @Valid @RequestBody AdminReviewRequest request) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Review not found"));

        if (request.getStatus() == ReviewStatus.PENDING) {
            return ResponseEntity.badRequest()
                    .body("Admin can only approve or reject a review");
        }

        review.setStatus(request.getStatus());

        if (request.getStatus() == ReviewStatus.REJECTED) {
            review.setAdminRemark(
                    request.getAdminRemark() == null
                            ? "Review rejected by admin"
                            : request.getAdminRemark().trim()
            );
        } else {
            review.setAdminRemark(null);
        }

        reviewRepository.save(review);

        return ResponseEntity.ok("Review status updated successfully");
    }

    // ADMIN: DELETE REVIEW
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Review not found"));

        reviewRepository.delete(review);

        return ResponseEntity.ok("Review deleted successfully");
    }
}