package com.laptop.controller;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptop.entity.Cart;
import com.laptop.repository.CartRepository;
import com.laptop.service.CartService;
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add/{productId}")
    public ResponseEntity<Cart> addToCart(
            @PathVariable Long productId,
            Authentication authentication) {

        String email = authentication.getName();

        Cart cart = cartService.addToCart(productId, email);

        return ResponseEntity.ok(cart);
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getCart(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
            cartRepository.findByUserEmail(email)
        );
    }
    @PutMapping("/update/{cartId}")
    public ResponseEntity<Cart> updateQuantity(
            @PathVariable Long cartId,
            @RequestBody Map<String, Integer> request,
            Authentication authentication) {

        String email = authentication.getName();

        Cart updatedCart = cartService.updateQuantity(
            cartId,
            request.get("quantity"),
            email
        );

        return ResponseEntity.ok(updatedCart);
    }
    @DeleteMapping("/remove/{cartId}")
    public ResponseEntity<String> removeCartItem(
            @PathVariable Long cartId,
            Authentication authentication) {

        String email = authentication.getName();

        cartService.removeCartItem(cartId, email);

        return ResponseEntity.ok("Product removed from cart successfully");
    }
}
