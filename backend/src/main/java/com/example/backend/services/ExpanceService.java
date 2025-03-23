package com.example.backend.services;

import com.example.backend.dto.ExpanceDTO;
import com.example.backend.entity.ExpanceEntity;

import java.util.List;

public interface ExpanceService {
    ExpanceEntity addExpance(ExpanceDTO expanceDTO,Long id);

    List<ExpanceDTO> getAllExpances(Long id);

    ExpanceDTO editExpense(Long expenseId, ExpanceDTO expanceDTO);

    boolean deleteExpense(Long expenseId);
}
