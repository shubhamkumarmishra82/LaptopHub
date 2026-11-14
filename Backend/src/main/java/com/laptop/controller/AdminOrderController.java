package com.laptop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.laptop.entity.Order;
import com.laptop.dto.OrderStatusRequest;
import com.laptop.dto.PaymentStatusRequest;
import com.laptop.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    // Get All Orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // Get Order By ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {

        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // Update Order Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody OrderStatusRequest request) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(id, request.getStatus())
        );
    }

    // Update Payment Status
    @PutMapping("/{id}/payment")
    public ResponseEntity<Order> updatePaymentStatus(
            @PathVariable Long id,
            @RequestBody PaymentStatusRequest request) {

        return ResponseEntity.ok(
                orderService.updatePaymentStatus(
                        id,
                        request.getPaymentStatus()
                )
        );
    }
}