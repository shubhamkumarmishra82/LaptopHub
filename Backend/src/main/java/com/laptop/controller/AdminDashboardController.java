package com.laptop.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptop.repository.ProductRepository;
import com.laptop.entity.Role;
import com.laptop.repository.OrderRepository;
import com.laptop.repository.RegisterRepository;
import com.laptop.repository.ReviewRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {
     @Autowired
    private  ProductRepository productRepository;
     @Autowired
    private OrderRepository orderRepository;
     @Autowired
    private  RegisterRepository registerRepository;
     @Autowired
     private ReviewRepository reviewRepository;

  

    @GetMapping("/dashboard-counts")
    public Map<String, Long> getDashboardCounts() {

        return Map.of(
            "totalProducts", productRepository.count(),
            "totalOrders", orderRepository.count(),
            "totalUsers", registerRepository.countByRole(Role.USER),
            "totalReviews" , reviewRepository.count()
        );
    }
}