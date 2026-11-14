package com.laptop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;

import com.laptop.dto.ReviewRequest;
import com.laptop.dto.ReviewResponse;
import com.laptop.entity.Register;
import com.laptop.entity.Review;
import com.laptop.entity.ReviewStatus;
import com.laptop.entity.Role;
import com.laptop.repository.RegisterRepository;
import com.laptop.repository.ReviewRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final RegisterRepository registerRepository;

    public ReviewController(ReviewRepository reviewRepository,
            RegisterRepository registerRepository) {
        this.reviewRepository = reviewRepository;
        this.registerRepository = registerRepository;
    }

    // Get logged-in user
    private Register getLoggedInUser(Authentication authentication) {

        Register user = registerRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));

        if (user.getRole() != Role.USER) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Only users can manage reviews");
        }

        return user;
    }

    // Convert Review to Response
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

    // CREATE REVIEW
    @PostMapping("/add")
    public ResponseEntity<?> addReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication authentication) {

        Register user = getLoggedInUser(authentication);

        if (reviewRepository.existsByUserId(user.getId())) {
            return ResponseEntity.badRequest()
                    .body("You have already submitted a review");
        }

        Review review = new Review();
        review.setUserId(user.getId());
        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());
        review.setStatus(ReviewStatus.PENDING);

        reviewRepository.save(review);

        return ResponseEntity.ok("Review submitted successfully. Waiting for admin approval.");
    }

    // GET MY REVIEWS
    @GetMapping("/my-reviews")
    public ResponseEntity<List<ReviewResponse>> getMyReviews(
            Authentication authentication) {

        Register user = getLoggedInUser(authentication);

        List<ReviewResponse> reviews = reviewRepository
                .findByUserId(user.getId())
                .stream()
                .map(this::convertToResponse)
                .toList();

        return ResponseEntity.ok(reviews);
    }

    // UPDATE MY REVIEW
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request,
            Authentication authentication) {

        Register user = getLoggedInUser(authentication);

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Review not found"));

        if (!review.getUserId().equals(user.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "You cannot update this review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());

        // Updated review needs fresh admin approval
        review.setStatus(ReviewStatus.PENDING);
        review.setAdminRemark(null);

        reviewRepository.save(review);

        return ResponseEntity.ok("Review updated. Waiting for admin approval.");
    }

    // DELETE MY REVIEW
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long id,
            Authentication authentication) {

        Register user = getLoggedInUser(authentication);

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Review not found"));

        if (!review.getUserId().equals(user.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "You cannot delete this review");
        }

        reviewRepository.delete(review);

        return ResponseEntity.ok("Review deleted successfully");
    }

    // PUBLIC APPROVED REVIEWS FOR HOME PAGE
    @GetMapping("/approved")
    public ResponseEntity<List<ReviewResponse>> getApprovedReviews() {

        List<ReviewResponse> reviews = reviewRepository
                .findByStatus(ReviewStatus.APPROVED)
                .stream()
                .map(this::convertToResponse)
                .toList();

        return ResponseEntity.ok(reviews);
    }
}