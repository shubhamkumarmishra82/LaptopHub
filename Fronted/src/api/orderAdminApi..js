const BASE_URL = "http://localhost:9090/api/admin/orders";

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

// Saare orders fetch
export const getAllOrders = async () => {
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to fetch orders");
    }

    return await response.json();
};

// ID se single order fetch
export const getOrderById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to fetch order details");
    }

    return await response.json();
};

// Order status update
export const updateOrderStatus = async (id, status) => {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status })
    });

    if (!response.ok) {
        throw new Error("Unable to update order status");
    }

    return await response.json();
};

export const updatePaymentStatus = async (id, paymentStatus) => {

    const response = await fetch(`${BASE_URL}/${id}/payment`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ paymentStatus })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Payment status update failed");
    }

    return data;
};
