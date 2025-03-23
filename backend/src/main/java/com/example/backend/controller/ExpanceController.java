package com.example.backend.controller;

import com.example.backend.dto.ExpanceDTO;
import com.example.backend.entity.ExpanceEntity;
import com.example.backend.services.ExpanceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@CrossOrigin(origins = "*")
@RequestMapping("/expenses")
public class ExpanceController {
    private final ExpanceService expanceService;

    public ExpanceController(ExpanceService expanceService) {
        this.expanceService = expanceService;
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<?> addExpance(@Valid @RequestBody ExpanceDTO expanceDTO, @PathVariable Long id) {
        try {
            System.out.println("uid" + id);
            ExpanceEntity createdExpance = expanceService.addExpance(expanceDTO,id);
            return new ResponseEntity<>(createdExpance, HttpStatus.CREATED);
        } catch (Exception e) {
            // This is a simple example. In a real scenario, you should handle different types of exceptions
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add expense: " + e.getMessage());
        }
    }

    @GetMapping("/all/{id}")
    public List<ExpanceDTO> getAllExpances(@PathVariable Long id) {
        return expanceService.getAllExpances(id);

    }

    @PutMapping("/edit/{expenseId}")
    public ResponseEntity<ExpanceDTO> editExpense(@PathVariable Long expenseId, @RequestBody ExpanceDTO expanceDTO) {
        ExpanceDTO updatedExpense = expanceService.editExpense(expenseId, expanceDTO);
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/delete/{expenseId}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long expenseId) {
        boolean isDeleted = expanceService.deleteExpense(expenseId);
        if (isDeleted) {
            return ResponseEntity.ok("Expance details with ID " + expenseId + " deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
