import { useEffect, useState } from "react";
import {
    addReview,
    getMyReviews,
    updateReview,
    deleteReview
} from "../api/reviewApi";

import "./MyReviews.css";

function MyReviews() {

    const [review, setReview] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadReviews = async () => {
        try {
            setLoading(true);
            const data = await getMyReviews();

            setReview(data.length > 0 ? data[0] : null);

            if (data.length > 0) {
                setRating(data[0].rating);
                setComment(data[0].comment);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (comment.trim().length < 10 || comment.trim().length > 500) {
            setError("Comment must be between 10 and 500 characters");
            return;
        }

        try {
            const payload = {
                rating: Number(rating),
                comment: comment.trim()
            };

            if (editing && review) {
                await updateReview(review.id, payload);
                setMessage("Review updated. Waiting for admin approval.");
            } else {
                await addReview(payload);
                setMessage("Review submitted successfully!");
            }

            setEditing(false);
            await loadReviews();

        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = () => {
        setRating(review.rating);
        setComment(review.comment);
        setEditing(true);
        setMessage("");
        setError("");
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your review?")) {
            return;
        }

        try {
            await deleteReview(review.id);
            setReview(null);
            setRating(5);
            setComment("");
            setEditing(false);
            setMessage("Review deleted successfully.");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading reviews...</h4>;
    }

    return (
        <div className="my-review-container">

            <h2>My Reviews</h2>
            <p className="review-subtitle">
                Share your experience with Laptop Hub.
            </p>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {review && !editing ? (

                <div className="my-review-card">

                    <div className="d-flex justify-content-between">
                        <h5>Your Website Review</h5>

                        <span className={`review-status ${review.status.toLowerCase()}`}>
                            {review.status}
                        </span>
                    </div>

                    <div className="my-review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                    </div>

                    <p>{review.comment}</p>

                    {review.adminRemark && (
                        <p className="text-danger">
                            Admin Remark: {review.adminRemark}
                        </p>
                    )}

                    <div className="review-actions">
                        <button
                            className="btn btn-primary"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>

                </div>

            ) : (

                <form className="review-form" onSubmit={handleSubmit}>

                    <h4>{editing ? "Update Your Review" : "Write Your Review"}</h4>

                    <label className="form-label">Your Rating</label>

                    <div className="rating-select">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span
                                key={value}
                                className={value <= rating ? "active" : ""}
                                onClick={() => setRating(value)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <label className="form-label mt-3">
                        Your Experience
                    </label>

                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write about your experience with Laptop Hub..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        minLength={10}
                        maxLength={500}
                        required
                    />

                    <small>{comment.length}/500 characters</small>

                    <div className="mt-3">
                        <button className="btn btn-primary" type="submit">
                            {editing ? "Update Review" : "Submit Review"}
                        </button>

                        {editing && (
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </form>

            )}

        </div>
    );
}

export default MyReviews;