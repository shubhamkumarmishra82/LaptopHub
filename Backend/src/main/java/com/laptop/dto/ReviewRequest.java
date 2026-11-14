package com.laptop.dto;

import jakarta.validation.constraints.*;

public class ReviewRequest {

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Minimum rating is 1")
    @Max(value = 5, message = "Maximum rating is 5")
    private Integer rating;

    @NotBlank(message = "Comment is required")
    @Size(min = 10, max = 500,
          message = "Comment must be between 10 and 500 characters")
    private String comment;

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}