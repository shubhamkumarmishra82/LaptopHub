
const BASE_URL = "http://localhost:9090/api/cart";

const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

// Add product to cart
export const addToCart = async (productId) => {

    const response = await fetch(
        `${BASE_URL}/add/${productId}`,
        {
            method: "POST",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Unable to add product to cart");
    }

    return await response.json();
};

// Get all cart items
export const getCartItems = async () => {

    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Unable to fetch cart items");
    }

    return await response.json();
};
// Update quantity
export const updateCartQuantity = async (cartId, quantity) => {
    const response = await fetch(
        `${BASE_URL}/update/${cartId}`,
        {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify({ quantity })
        }
    );

    if (!response.ok) {
        throw new Error("Unable to update quantity");
    }

    return await response.json();
};

// Remove product
export const removeCartItem = async (cartId) => {
    const response = await fetch(
        `${BASE_URL}/remove/${cartId}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Unable to remove product");
    }

    return true;
};