package com.example.backend.dto;

import jakarta.persistence.Transient;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ExpanceDTO {
    private long id;
    
    private LocalDate date;
    private String description;
    private String category;
    private int amount;
    @Transient
    private Long userId;
}
