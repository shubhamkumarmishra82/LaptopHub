import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCartItems } from "../api/cartApi";
import { placeOrder } from "../api/orderApi";

function CheckoutPage() {

  const location = useLocation();
  const navigate = useNavigate();

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const type = location.state?.type;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {

    const loadCheckoutItems = async () => {
      try {

        if (type === "buyNow") {

          setCheckoutItems([
            {
              ...location.state.product,
              quantity: 1
            }
          ]);

        } else {

          const data = await getCartItems();
          setCheckoutItems(data);

        }

      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutItems();

  }, [type, location.state]);

  const totalAmount = checkoutItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress({
      ...address,
      [name]: value
    });
  };

  const handlePlaceOrder = async () => {

    const {
      fullName,
      phone,
      houseNo,
      street,
      city,
      state,
      pincode
    } = address;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !houseNo.trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all address details");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6 digit pincode");
      return;
    }

    if (checkoutItems.length === 0) {
      alert("No products available");
      return;
    }

    const fullAddress =
      `${fullName}, ${phone}, ${houseNo}, ${street}, ${city}, ${state} - ${pincode}`;

    const orderData = {
      orderType: type === "buyNow" ? "BUY_NOW" : "CART",
      productId: type === "buyNow" ? location.state.product.id : null,
      quantity: type === "buyNow" ? 1 : null,
      address: fullAddress,
      paymentMethod: "COD"
    };

    try {

      setPlacingOrder(true);

      const response = await placeOrder(orderData);

      alert("Order placed successfully!");

      navigate("/my-orders");

    } catch (error) {
      alert(error.message || "Unable to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <h3>Loading Checkout...</h3>;
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="container mt-5">
        <h3>No products available for checkout</h3>
        <Link to="/cart" className="btn btn-primary">
          Go to Cart
        </Link>
      </div>
    );
  }

 

  return (
    <div className="container mt-4 mb-5">

      <h2 className="mb-4">Checkout</h2>

      <div className="row">

        {/* Address Form */}
        <div className="col-md-7">

          <div className="card shadow-sm p-4 mb-4">

            <h4 className="mb-3">Delivery Address</h4>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={address.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter 10 digit mobile number"
                value={address.phone}
                onChange={handleChange}
                maxLength="10"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">House / Flat Number</label>
              <input
                type="text"
                name="houseNo"
                className="form-control"
                placeholder="House number, flat number"
                value={address.houseNo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Street / Area</label>
              <input
                type="text"
                name="street"
                className="form-control"
                placeholder="Enter street or area"
                value={address.street}
                onChange={handleChange}
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Enter city"
                  value={address.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="Enter state"
                  value={address.state}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                className="form-control"
                placeholder="Enter 6 digit pincode"
                value={address.pincode}
                onChange={handleChange}
                maxLength="6"
              />
            </div>

          </div>

          {/* Payment Method */}
          <div className="card shadow-sm p-4">

            <h4 className="mb-3">Payment Method</h4>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked
                readOnly
              />

              <label className="form-check-label">
                Cash on Delivery (COD)
              </label>
            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div className="col-md-5">

          <div className="card shadow-sm p-4">

            <h4 className="mb-3">Order Summary</h4>

            {checkoutItems.map(item => (

              <div
                key={item.productId || item.id}
                className="border-bottom pb-3 mb-3"
              >

                <h6>{item.name || item.productName}</h6>

                <p className="mb-1">
                  Price: ₹{item.price}
                </p>

                <p className="mb-1">
                  Quantity: {item.quantity}
                </p>

                <strong>
                  Subtotal: ₹
                  {Number(item.price) * Number(item.quantity)}
                </strong>

              </div>

            ))}

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <strong>₹{totalAmount}</strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <strong className="text-success">FREE</strong>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <h5>Total Amount</h5>
              <h5>₹{totalAmount}</h5>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>

            <Link
              className="btn btn-outline-secondary w-100 mt-2"
              to="/cart"
            >
              Back to Cart
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;
