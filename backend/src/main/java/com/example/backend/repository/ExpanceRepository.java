package com.example.backend.repository;

import com.example.backend.entity.ExpanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpanceRepository extends JpaRepository<ExpanceEntity, Long> {
    List<ExpanceEntity> findByUserEntity_Id(Long id);
}
