package com.laptop.dto;

import com.laptop.entity.ReviewStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AdminReviewRequest {

    @NotNull(message = "Review status is required")
    private ReviewStatus status;

    @Size(max = 300, message = "Remark cannot exceed 300 characters")
    private String adminRemark;

    public ReviewStatus getStatus() {
        return status;
    }

    public void setStatus(ReviewStatus status) {
        this.status = status;
    }

    public String getAdminRemark() {
        return adminRemark;
    }

    public void setAdminRemark(String adminRemark) {
        this.adminRemark = adminRemark;
    }
}