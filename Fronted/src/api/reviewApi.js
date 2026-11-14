const BASE_URL = "http://localhost:9090/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

const handleResponse = async (response) => {
    const data = await response.text();

    if (!response.ok) {
        throw new Error(data || "Something went wrong");
    }

    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
};

// USER: CREATE REVIEW
export const addReview = async (review) => {
    const response = await fetch(`${BASE_URL}/reviews/add`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(review)
    });

    return handleResponse(response);
};

// USER: GET MY REVIEWS
export const getMyReviews = async () => {
    const response = await fetch(`${BASE_URL}/reviews/my-reviews`, {
        headers: getHeaders()
    });

    return handleResponse(response);
};

// USER: UPDATE REVIEW
export const updateReview = async (id, review) => {
    const response = await fetch(`${BASE_URL}/reviews/update/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(review)
    });

    return handleResponse(response);
};

// USER: DELETE REVIEW
export const deleteReview = async (id) => {
    const response = await fetch(`${BASE_URL}/reviews/delete/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    return handleResponse(response);
};

// PUBLIC: APPROVED REVIEWS
export const getApprovedReviews = async () => {
    const response = await fetch(`${BASE_URL}/reviews/approved`);

    return handleResponse(response);
};

// ADMIN: GET ALL REVIEWS
export const getAllReviews = async () => {
    const response = await fetch(`${BASE_URL}/admin/reviews`, {
        headers: getHeaders()
    });

    return handleResponse(response);
};

// ADMIN: APPROVE / REJECT
export const updateReviewStatus = async (id, status, adminRemark) => {
    const response = await fetch(`${BASE_URL}/admin/reviews/${id}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status, adminRemark })
    });

    return handleResponse(response);
};

// ADMIN: DELETE REVIEW
export const deleteAdminReview = async (id) => {
    const response = await fetch(`${BASE_URL}/admin/reviews/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });

    return handleResponse(response);
};