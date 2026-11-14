
package com.laptop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;

import com.laptop.dto.OrderRequest;
import com.laptop.entity.Order;
import com.laptop.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // PLACE ORDER
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(
            @RequestBody OrderRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Order order = orderService.placeOrder(request, email);

        return ResponseEntity.ok(order);
    }

    // GET MY ORDERS
    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
            orderService.getMyOrders(email)
        );
    }

    // GET ORDER BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
            orderService.getOrderById(id, email)
        );
    }

@PutMapping("/cancel/{id}")
public ResponseEntity<Order> cancelOrder(
        @PathVariable Long id,
        Authentication authentication) {

    String email = authentication.getName();

    Order order = orderService.cancelOrder(id, email);

    return ResponseEntity.ok(order);
}

}
