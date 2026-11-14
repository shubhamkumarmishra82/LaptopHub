
const BASE_URL = "http://localhost:9090/api/orders";

export const placeOrder = async (orderData) => {

  const response = await fetch(`${BASE_URL}/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Order failed");
  }

  return await response.json();
};

export const cancelOrder = async (orderId) => {

  const response = await fetch(
    `http://localhost:9090/api/orders/cancel/${orderId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to cancel order");
  }

  return await response.json();
};

export const getMyOrders = async () => {

  const response = await fetch(
    "http://localhost:9090/api/orders/my-orders",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch orders");
  }

  return await response.json();
};
