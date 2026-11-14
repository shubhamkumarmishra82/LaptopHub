package com.laptop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptop.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserEmailOrderByOrderDateDesc(String userEmail);

    Order findByIdAndUserEmail(Long id, String userEmail);
}