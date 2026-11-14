import { useEffect, useState } from "react";

import {
    getAllReviews,
    updateReviewStatus,
    deleteAdminReview
} from "../api/reviewApi";

import "./Reviews.css";

function Reviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("ALL");

    const loadReviews = async () => {
        try {
            setLoading(true);
            const data = await getAllReviews();
            setReviews(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleStatus = async (id, status) => {

        let remark = "";

        if (status === "REJECTED") {
            remark = window.prompt("Enter rejection reason:");

            if (remark === null) return;

            if (!remark.trim()) {
                alert("Please enter rejection reason");
                return;
            }
        }

        try {
            await updateReviewStatus(id, status, remark);
            await loadReviews();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this review permanently?")) {
            return;
        }

        try {
            await deleteAdminReview(id);
            await loadReviews();
        } catch (err) {
            alert(err.message);
        }
    };

    const filteredReviews = filter === "ALL"
        ? reviews
        : reviews.filter(review => review.status === filter);

    const pending = reviews.filter(r => r.status === "PENDING").length;
    const approved = reviews.filter(r => r.status === "APPROVED").length;
    const rejected = reviews.filter(r => r.status === "REJECTED").length;

    if (loading) {
        return <h4 className="text-center mt-5">Loading reviews...</h4>;
    }

    return (
        <div className="admin-reviews-container">

            <h2>Customer Reviews</h2>
            <p className="text-secondary">
                Manage Laptop Hub website testimonials.
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="review-summary">

                <div className="summary-card">
                    <h3>{reviews.length}</h3>
                    <p>Total Reviews</p>
                </div>

                <div className="summary-card pending-card">
                    <h3>{pending}</h3>
                    <p>Pending</p>
                </div>

                <div className="summary-card approved-card">
                    <h3>{approved}</h3>
                    <p>Approved</p>
                </div>

                <div className="summary-card rejected-card">
                    <h3>{rejected}</h3>
                    <p>Rejected</p>
                </div>

            </div>

            <div className="review-filter">
                <label>Filter Reviews:</label>

                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="ALL">All Reviews</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            <div className="table-responsive">

                <table className="table admin-review-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredReviews.length === 0 ? (

                            <tr>
                                <td colSpan="6" className="text-center">
                                    No reviews found
                                </td>
                            </tr>

                        ) : (

                            filteredReviews.map(review => (

                                <tr key={review.id}>

                                    <td>{review.id}</td>

                                    <td>{review.userName}</td>

                                    <td className="admin-review-stars">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </td>

                                    <td className="review-comment">
                                        {review.comment}
                                        {review.adminRemark && (
                                            <small className="d-block text-danger">
                                                Remark: {review.adminRemark}
                                            </small>
                                        )}
                                    </td>

                                    <td>
                                        <span className={`review-status ${review.status.toLowerCase()}`}>
                                            {review.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="admin-review-actions">

                                            {review.status !== "APPROVED" && (
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => handleStatus(review.id, "APPROVED")}
                                                >
                                                    Approve
                                                </button>
                                            )}

                                            {review.status !== "REJECTED" && (
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => handleStatus(review.id, "REJECTED")}
                                                >
                                                    Reject
                                                </button>
                                            )}

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(review.id)}
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Reviews;