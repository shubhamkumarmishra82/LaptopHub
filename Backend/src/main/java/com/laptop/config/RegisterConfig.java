package com.laptop.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
public class RegisterConfig {
    private final JwtFilter jwtFilter;

    public RegisterConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // CSRF disable because we are using JWT with stateless sessions
            .csrf(csrf -> csrf.disable())

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

            	    // Login and registration are public
            	    .requestMatchers("/api/auth/**").permitAll()

            	    // Product images are public
            	    .requestMatchers("/uploads/**").permitAll()

            	    // Public product viewing
            	    .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()

            	    // Public review viewing
            	    .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()

            	    // Only ADMIN can manage products
            	    .requestMatchers("/api/admin/**").hasRole("ADMIN")

            	    // Only USER can access cart
            	    .requestMatchers("/api/cart/**").hasRole("USER")

            	    // Only USER can place orders
            	    .requestMatchers("/api/orders/**").hasRole("USER")

            	    // Only USER can submit reviews
            	    .requestMatchers(HttpMethod.POST, "/api/reviews/**").hasRole("USER")

            	    .anyRequest().authenticated()
            	)

            // JWT authentication does not use HTTP sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Add JWT filter before Spring Security's username/password filter
            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }

    // Password hashing
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}