package com.laptop.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laptop.entity.Cart;
import com.laptop.entity.Order;
import com.laptop.entity.OrderItem;
import com.laptop.entity.Product;
import com.laptop.dto.OrderRequest;
import com.laptop.repository.CartRepository;
import com.laptop.repository.OrderRepository;
import com.laptop.repository.ProductRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;


    // =========================================
    // 1. PLACE ORDER (CART + BUY_NOW)
    // =========================================

    @Transactional
    public Order placeOrder(OrderRequest request, String email) {

        Order order = new Order();

        order.setUserEmail(email);
        order.setAddress(request.getAddress());
        order.setPaymentMethod("COD");
        order.setPaymentStatus("PENDING");
        order.setOrderStatus("PLACED");

        BigDecimal totalAmount = BigDecimal.ZERO;

        String orderType = request.getOrderType();

        // CART ORDER
        if ("CART".equalsIgnoreCase(orderType)) {

            List<Cart> cartItems = cartRepository.findByUserEmail(email);

            if (cartItems.isEmpty()) {
                throw new RuntimeException("Your cart is empty");
            }

            for (Cart cart : cartItems) {

                Product product = productRepository.findById(cart.getProductId())
                        .orElseThrow(() ->
                                new RuntimeException("Product not found"));

                OrderItem item = createOrderItem(
                        product,
                        cart.getQuantity()
                );

                order.addItem(item);

                totalAmount = totalAmount.add(
                        item.getPrice().multiply(
                                BigDecimal.valueOf(item.getQuantity())
                        )
                );
            }

            // Clear user's cart after order creation
            cartRepository.deleteAll(cartItems);

        }

        // BUY NOW ORDER
        else if ("BUY_NOW".equalsIgnoreCase(orderType)) {

            if (request.getProductId() == null
                    || request.getQuantity() == null
                    || request.getQuantity() <= 0) {

                throw new RuntimeException("Invalid product or quantity");
            }

            Product product = productRepository.findById(request.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("Product not found"));

            OrderItem item = createOrderItem(
                    product,
                    request.getQuantity()
            );

            order.addItem(item);

            totalAmount = item.getPrice().multiply(
                    BigDecimal.valueOf(item.getQuantity())
            );

        } else {

            throw new RuntimeException("Invalid order type");
        }

        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }


    // =========================================
    // 2. CREATE ORDER ITEM + REDUCE STOCK
    // =========================================

    private OrderItem createOrderItem(Product product, Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Invalid quantity");
        }

        if (product.getStock() == null || product.getStock() < quantity) {
            throw new RuntimeException(
                    "Insufficient stock for " + product.getName()
            );
        }

        // Reduce stock
        product.setStock(product.getStock() - quantity);

        productRepository.save(product);

        // Create OrderItem
        OrderItem item = new OrderItem();

        item.setProductId(product.getId());
        item.setProductName(product.getName());
        item.setModelNumber(product.getModelNumber());
        item.setPrice(product.getPrice());
        item.setQuantity(quantity);

        return item;
    }


    // =========================================
    // 3. CUSTOMER - GET MY ORDERS
    // =========================================

    public List<Order> getMyOrders(String email) {

        return orderRepository
                .findByUserEmailOrderByOrderDateDesc(email);
    }


    // =========================================
    // 4. CUSTOMER - GET ORDER BY ID
    // =========================================

    public Order getOrderById(Long id, String email) {

        Order order = orderRepository.findByIdAndUserEmail(id, email);

        if (order == null) {
            throw new RuntimeException("Order not found");
        }

        return order;
    }


    // =========================================
    // 5. CUSTOMER - CANCEL ORDER
    // =========================================

    @Transactional
    public Order cancelOrder(Long id, String email) {

        Order order = orderRepository.findByIdAndUserEmail(id, email);

        if (order == null) {
            throw new RuntimeException("Order not found");
        }

        if (!"PLACED".equals(order.getOrderStatus())
                && !"CONFIRMED".equals(order.getOrderStatus())) {

            throw new RuntimeException(
                    "Order cannot be cancelled now"
            );
        }

        restoreStock(order);

        order.setOrderStatus("CANCELLED");

        return orderRepository.save(order);
    }


    // =========================================
    // 6. ADMIN - GET ALL ORDERS
    // =========================================

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // =========================================
    // 7. ADMIN - GET ORDER BY ID
    // =========================================

    public Order getOrderById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }


    // =========================================
    // 8. ADMIN - UPDATE ORDER STATUS
    // =========================================

    @Transactional
    public Order updateOrderStatus(Long id, String status) {

        Order order = getOrderById(id);

        if (status == null) {
            throw new RuntimeException("Status is required");
        }

        status = status.trim().toUpperCase();

        if (!List.of(
                "PLACED",
                "CONFIRMED",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
        ).contains(status)) {

            throw new RuntimeException("Invalid order status");
        }

        if ("CANCELLED".equals(order.getOrderStatus())
                || "DELIVERED".equals(order.getOrderStatus())) {

            throw new RuntimeException(
                    "This order status cannot be changed"
            );
        }

        // Admin cancellation
        if ("CANCELLED".equals(status)) {

            if (!"PLACED".equals(order.getOrderStatus())
                    && !"CONFIRMED".equals(order.getOrderStatus())) {

                throw new RuntimeException(
                        "This order cannot be cancelled now"
                );
            }

            restoreStock(order);
        }

        order.setOrderStatus(status);

        return orderRepository.save(order);
    }


    // =========================================
    // 9. ADMIN - UPDATE PAYMENT STATUS
    // =========================================

    @Transactional
    public Order updatePaymentStatus(Long id, String paymentStatus) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!paymentStatus.equals("PAID") &&
            !paymentStatus.equals("PENDING")) {
            throw new RuntimeException("Invalid payment status");
        }

        if (order.getOrderStatus().equals("CANCELLED")) {
            throw new RuntimeException("Cancelled order payment cannot be updated");
        }

        if (paymentStatus.equals("PAID") &&
            !order.getOrderStatus().equals("DELIVERED")) {
            throw new RuntimeException("Payment can be marked PAID only after delivery");
        }

        if (order.getPaymentStatus().equals("PAID") &&
            paymentStatus.equals("PENDING")) {
            throw new RuntimeException("Paid status cannot be changed to pending");
        }

        order.setPaymentStatus(paymentStatus);

        return orderRepository.save(order);
    }


    // =========================================
    // 10. RESTORE STOCK
    // =========================================

    private void restoreStock(Order order) {

        for (OrderItem item : order.getItems()) {

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("Product not found"));

            int currentStock = product.getStock() == null
                    ? 0 : product.getStock();

            product.setStock(currentStock + item.getQuantity());

            productRepository.save(product);
        }
    }

}