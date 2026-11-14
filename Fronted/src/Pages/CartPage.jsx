
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
    getCartItems,
    updateCartQuantity,
    removeCartItem
} from "../api/cartApi";

import { setCartCount } from "../store/cartSlice";
import "./CartPage.css";

function CartPage() {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    // Update Navbar count
    const updateCount = (items) => {

        const count = items.reduce(
            (total, item) => total + item.quantity,
            0
        );

        dispatch(setCartCount(count));
    };

    // Fetch cart items
    const fetchCart = async () => {

        try {

            setError("");

            const data = await getCartItems();

            setCartItems(data);
            updateCount(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Increase / decrease quantity
    const handleQuantity = async (item, change) => {

        const newQuantity = item.quantity + change;

        try {

            setUpdatingId(item.id);
            setError("");

            // Quantity 0 means remove item
            if (newQuantity === 0) {

                await removeCartItem(item.id);

                const updatedItems = cartItems.filter(
                    cart => cart.id !== item.id
                );

                setCartItems(updatedItems);
                updateCount(updatedItems);

                return;
            }

            const updatedItem = await updateCartQuantity(
                item.id,
                newQuantity
            );

            const updatedItems = cartItems.map(cart =>
                cart.id === item.id ? updatedItem : cart
            );

            setCartItems(updatedItems);
            updateCount(updatedItems);

        } catch (error) {

            setError(error.message);

        } finally {

            setUpdatingId(null);
        }
    };

    // Remove product
    const handleRemove = async (cartId) => {

        try {

            setUpdatingId(cartId);
            setError("");

            await removeCartItem(cartId);

            const updatedItems = cartItems.filter(
                item => item.id !== cartId
            );

            setCartItems(updatedItems);
            updateCount(updatedItems);

        } catch (error) {

            setError(error.message);

        } finally {

            setUpdatingId(null);
        }
    };

    // Total amount
    const totalAmount = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    if (loading) {
        return (
            <div className="cart-loading">
                <div className="spinner-border text-primary"></div>
                <p>Loading your cart...</p>
            </div>
        );
    }

    return (

        <div className="cart-page">

            <div className="cart-container">

                <div className="cart-heading">
                    <div>
                        <h2>Shopping Cart</h2>
                        <p>
                            {cartItems.length} different products in your cart
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="cart-error">
                        {error}
                    </div>
                )}

                {cartItems.length === 0 ? (

                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>
                            Looks like you haven't added any laptop yet.
                        </p>
                        <a href="/laptops" className="continue-shopping">
                            Continue Shopping
                        </a>
                    </div>

                ) : (

                    <div className="cart-layout">

                        {/* Cart Products */}
                        <div className="cart-products">

                            {cartItems.map(item => (

                                <div className="cart-product" key={item.id}>

                                    <div className="product-details">

                                        <div className="product-icon">
                                            💻
                                        </div>

                                        <div className="product-info">
                                            <h4>{item.productName}</h4>

                                            <p>
                                                Model: {item.modelNumber}
                                            </p>

                                            <span className="product-price">
                                                ₹{Number(item.price).toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="cart-product-bottom">

                                        <div className="quantity-section">

                                            <span>Quantity</span>

                                            <div className="quantity-control">

                                                <button
                                                    onClick={() => handleQuantity(item, -1)}
                                                    disabled={updatingId === item.id}
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() => handleQuantity(item, 1)}
                                                    disabled={updatingId === item.id}
                                                >
                                                    +
                                                </button>

                                            </div>

                                        </div>

                                        <div className="subtotal-section">

                                            <span>Subtotal</span>

                                            <strong>
                                                ₹{(
                                                    Number(item.price) * item.quantity
                                                ).toLocaleString("en-IN")}
                                            </strong>

                                        </div>

                                        <button
                                            className="remove-button"
                                            onClick={() => handleRemove(item.id)}
                                            disabled={updatingId === item.id}
                                        >
                                            Remove
                                        </button>

                                    </div>

                                    {updatingId === item.id && (
                                        <div className="item-updating">
                                            Updating...
                                        </div>
                                    )}

                                </div>

                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="cart-summary">

                            <h3>Order Summary</h3>

                            <div className="summary-row">
                                <span>Total Products</span>
                                <span>
                                    {cartItems.reduce(
                                        (total, item) => total + item.quantity,
                                        0
                                    )}
                                </span>
                            </div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>
                                    ₹{totalAmount.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className="free-delivery">Free</span>
                            </div>

                            <hr />

                            <div className="summary-total">
                                <span>Total Amount</span>
                                <strong>
                                    ₹{totalAmount.toLocaleString("en-IN")}
                                </strong>
                            </div>

                            <button
                                className="checkout-button"
                                onClick={() => window.location.href = "/checkout"}
                            >
                                Proceed to Checkout
                            </button>

                            <a href="/laptops" className="continue-link">
                                ← Continue Shopping
                            </a>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default CartPage;
