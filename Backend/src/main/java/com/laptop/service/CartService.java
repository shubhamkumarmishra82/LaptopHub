package com.laptop.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptop.entity.Cart;
import com.laptop.entity.Product;
import com.laptop.repository.CartRepository;
import com.laptop.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Long productId, String email) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                    new RuntimeException("Product not found"));

        Optional<Cart> existingCart =
                cartRepository.findByUserEmailAndProductId(
                    email, productId
                );

        if (existingCart.isPresent()) {

            Cart cart = existingCart.get();

            cart.setQuantity(cart.getQuantity() + 1);

            return cartRepository.save(cart);
        }

        Cart cart = new Cart();

        cart.setUserEmail(email);
        cart.setProductId(product.getId());
        cart.setProductName(product.getName());
        cart.setModelNumber(product.getModelNumber());
        cart.setPrice(product.getPrice());
        cart.setQuantity(1);

        return cartRepository.save(cart);
    }
    public Cart updateQuantity(Long cartId, Integer quantity, String email) {

        Cart cart = cartRepository.findByIdAndUserEmail(cartId, email)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity < 1) {
            throw new RuntimeException("Quantity must be at least 1");
        }

        cart.setQuantity(quantity);

        return cartRepository.save(cart);
    }
    public void removeCartItem(Long cartId, String email) {

        Cart cart = cartRepository.findByIdAndUserEmail(cartId, email)
                .orElseThrow(() ->
                    new RuntimeException("Cart item not found")
                );

        cartRepository.delete(cart);
    }
}
