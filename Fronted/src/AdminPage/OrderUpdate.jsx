import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  getOrderById,updateOrderStatus ,  updatePaymentStatus} from "../api/orderAdminApi.";
import "./orderupdate.css";


function OrderUpdate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Get Order By ID
    const fetchOrder = async () => {
        try {
            const data = await getOrderById(id);

            setOrder(data);
            setStatus(data.orderStatus);
            setPaymentStatus(data.paymentStatus);

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    // Update Order and Payment Status
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            await updateOrderStatus(id, status);

            await updatePaymentStatus(id, paymentStatus);

            alert("Order updated successfully");

            navigate("/admin/dashboard/orders");

        } catch (error) {
            alert(error.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading Order...</h4>;
    }

    if (!order) {
        return <h4 className="text-center mt-5">Order Not Found</h4>;
    }

    return (
        <div className="order-update-page">

            <div className="order-update-card">

                <h2>Update Order</h2>

                <form onSubmit={handleUpdate}>

                    <div className="mb-3">
                        <label className="form-label">Order ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={order.id}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Customer Email</label>
                        <input
                            type="text"
                            className="form-control"
                            value={order.userEmail || ""}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Total Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            value={`₹${order.totalAmount}`}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <input
                            type="text"
                            className="form-control"
                            value={order.paymentMethod || ""}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Delivery Address</label>
                        <textarea
                            className="form-control"
                            value={order.address || ""}
                            readOnly
                            rows="3"
                        />
                    </div>

                    {/* Order Status */}
                    <div className="mb-3">
                        <label className="form-label">Order Status</label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="PLACED">PLACED</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </div>

                    {/* Payment Status */}
                    <div className="mb-3">
                        <label className="form-label">Payment Status</label>

                        <select
                            className="form-select"
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                        >
                            <option value="PENDING">PENDING</option>

                            <option
                                value="PAID"
                                disabled={status !== "DELIVERED"}
                            >
                                PAID
                            </option>
                        </select>

                        {status !== "DELIVERED" && (
                            <small className="text-muted">
                                Payment can be marked PAID after delivery.
                            </small>
                        )}
                    </div>

                    <div className="d-flex gap-2">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Update Order"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin/dashboard/orders")}
                        >
                            Back
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default OrderUpdate;
