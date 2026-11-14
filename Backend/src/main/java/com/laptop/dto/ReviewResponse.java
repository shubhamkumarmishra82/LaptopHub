package com.laptop.dto;

import java.time.LocalDateTime;
import com.laptop.entity.ReviewStatus;

public class ReviewResponse {

    private Long id;
    private Long userId;
    private String userName;
    private Integer rating;
    private String comment;
    private ReviewStatus status;
    private String adminRemark;
    private LocalDateTime createdAt;

    public ReviewResponse(Long id, Long userId, String userName,
            Integer rating, String comment, ReviewStatus status,
            String adminRemark, LocalDateTime createdAt) {

        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.rating = rating;
        this.comment = comment;
        this.status = status;
        this.adminRemark = adminRemark;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public ReviewStatus getStatus() {
        return status;
    }

    public String getAdminRemark() {
        return adminRemark;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}