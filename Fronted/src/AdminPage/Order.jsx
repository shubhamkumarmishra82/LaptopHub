import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../api/orderAdminApi.";
import "./Order.css";

function Order() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Navigate to Update Page
    const handleUpdate = (id) => {
            navigate(`/admin/dashboard/order-update/${id}`);
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading Orders...</h4>;
    }

    return (
        <div className="admin-order-page">

            <h2 className="mb-4">All Orders</h2>

            <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Email</th>
                            <th>Products</th>
                            <th>Total Amount</th>
                            <th>Payment</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Payment Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.length > 0 ? (

                            orders.map(order => (

                                <tr key={order.id}>

                                    <td>#{order.id}</td>

                                    <td>{order.userEmail}</td>

                                    <td>
                                        {order.items?.map((item, index) => (
                                            <div key={item.id || index}>
                                                {item.productName} (x{item.quantity})
                                            </div>
                                        ))}
                                    </td>

                                    <td>₹{order.totalAmount}</td>

                                    <td>{order.paymentMethod}</td>

                                    <td>
                                        {order.orderDate
                                            ? new Date(order.orderDate).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td>
                                        <span className={`order-status ${order.orderStatus?.toLowerCase()}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td>
                                      <span className={`payment-status ${order.paymentStatus?.toLowerCase()}`}>
                                       {order.paymentStatus}
                                      </span>
                                        </td>

                                    <td>
                                        <button
                                            className="order-edit-btn"
                                            title="Update Order"
                                            onClick={() => handleUpdate(order.id)}
                                        >
                                            ✎
                                        </button>
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="8" className="text-center">
                                    No Orders Found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Order;