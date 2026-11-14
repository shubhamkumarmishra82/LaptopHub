package com.laptop.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.laptop.entity.Register;
import com.laptop.entity.Role;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    boolean existsByEmail(String email);
    Optional<Register> findByEmail(String email);
    
    long countByRole(Role role);
    List<Register> findByRole(Role role);
}