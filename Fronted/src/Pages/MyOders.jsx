import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../api/orderApi";
import { Link } from "react-router-dom";

function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's orders
  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  // Cancel Order
  const handleCancelOrder = async (orderId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    try {

      const updatedOrder = await cancelOrder(orderId);

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? updatedOrder : order
        )
      );

      alert("Order cancelled successfully!");

    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading Orders...
      </h3>
    );
  }

  return (

    <div className="container mt-4 mb-5">

      <h2 className="mb-4">My Orders</h2>
      <Link className="btn btn-dark text-light my-2" to="/">Back</Link>

      {orders.length === 0 ? (

        <div className="text-center mt-5">
          <h4>You have not placed any orders yet.</h4>
          <p className="text-muted">
            Your orders will appear here.
          </p>
        </div>

      ) : (

        orders.map(order => (

          <div
            className="card shadow-sm p-4 mb-4"
            key={order.id}
          >

            {/* Order Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap">

              <div>
                <h5>Order #{order.id}</h5>

                <small className="text-muted">
                  Order Date: {
                    order.orderDate
                      ? new Date(order.orderDate).toLocaleString()
                      : "N/A"
                  }
                </small>
              </div>

              <span
                className={`badge ${
                  order.orderStatus === "PLACED"
                    ? "bg-success"
                    : order.orderStatus === "CANCELLED"
                    ? "bg-danger"
                    : "bg-primary"
                }`}
              >
                {order.orderStatus}
              </span>

            </div>

            <hr />

            {/* Products */}
            <h5 className="mb-3">Ordered Products</h5>

            {order.items?.map(item => (

              <div
                key={item.id}
                className="border rounded p-3 mb-3"
              >

                <h6>{item.productName}</h6>

                <p className="mb-1">
                  Model: {item.modelNumber}
                </p>

                <p className="mb-1">
                  Price: ₹{item.price}
                </p>

                <p className="mb-1">
                  Quantity: {item.quantity}
                </p>

                <strong>
                  Subtotal: ₹{
                    Number(item.price) * Number(item.quantity)
                  }
                </strong>

              </div>

            ))}

            <hr />

            {/* Order Details */}
            <div className="row">

              <div className="col-md-6">

                <h6>Delivery Address</h6>

                <p className="text-muted">
                  {order.address}
                </p>

                <h6>Payment Method</h6>

                <p className="text-muted">
                  {order.paymentMethod}
                </p>

              </div>

              <div className="col-md-6 text-md-end">

                <h5>
                  Total Amount: ₹{order.totalAmount}
                </h5>

                {order.orderStatus === "PLACED" && (

                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>

                )}

              </div>

            </div>
     
          </div>

        ))

      )}

    </div>

  );
}

export default MyOrders;
