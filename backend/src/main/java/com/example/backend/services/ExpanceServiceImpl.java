package com.example.backend.services;

import com.example.backend.dto.ExpanceDTO;
import com.example.backend.entity.ExpanceEntity;
import com.example.backend.exception.ExpenseNotFoundException;
import com.example.backend.repository.ExpanceRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpanceServiceImpl implements ExpanceService {

    private final ExpanceRepository expanceRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExpanceServiceImpl(ExpanceRepository expanceRepository, UserRepository userRepository) {
        this.expanceRepository = expanceRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ExpanceEntity addExpance(ExpanceDTO expanceDTO,Long id) {
        System.out.println("inside add expense....");
        ExpanceEntity expanceEntity = new ExpanceEntity();
        expanceDTO.setUserId(id);
        BeanUtils.copyProperties(expanceDTO, expanceEntity);
        userRepository.findById(id).ifPresent(userEntity -> {
            expanceEntity.setUserEntity(userEntity);
            System.out.println("UserEntity found and set: " + userEntity.getId());
        });
        return expanceRepository.save(expanceEntity);
    }

    // @Override
    // public ExpanceEntity addExpance(ExpanceDTO expanceDTO,Long id) {
    //     ExpanceEntity expanceEntity = new ExpanceEntity();
    //     BeanUtils.copyProperties(expanceDTO, expanceEntity);
    //     return expanceRepository.save(expanceEntity);
    // }

    @Override
    public List<ExpanceDTO> getAllExpances(Long id) {
        List<ExpanceEntity> expanceEntities = expanceRepository.findByUserEntity_Id(id);
        return expanceEntities.stream().map(expance -> {
            ExpanceDTO dto = new ExpanceDTO();
            BeanUtils.copyProperties(expance, dto);
            dto.setUserId(expance.getUserEntity().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ExpanceDTO editExpense(Long expenseId, ExpanceDTO expanceDTO) {
        return expanceRepository.findById(expenseId).map(expense -> {
            if (expanceDTO.getDate() != null) {
                expense.setDate(expanceDTO.getDate());
            }
            if (expanceDTO.getAmount() != 0) {
                expense.setAmount(expanceDTO.getAmount());
            }
            if (expanceDTO.getDescription() != null) {
                expense.setDescription(expanceDTO.getDescription());
            }
            if (expanceDTO.getCategory() != null) {
                expense.setCategory(expanceDTO.getCategory());
            }
            if (expanceDTO.getUserId() != null) {
                userRepository.findById(expanceDTO.getUserId()).ifPresent(expense::setUserEntity);
            }

            ExpanceEntity updatedExpense = expanceRepository.save(expense);

            ExpanceDTO updatedExpanceDTO = new ExpanceDTO();
            BeanUtils.copyProperties(updatedExpense, updatedExpanceDTO);
            updatedExpanceDTO.setUserId(updatedExpense.getUserEntity().getId());

            return updatedExpanceDTO;
        }).orElseThrow(() -> new ExpenseNotFoundException("Expense not found with id " + expenseId));
    }

    @Override
    public boolean deleteExpense(Long expenseId) {
        if (expanceRepository.existsById(expenseId)) {
            expanceRepository.deleteById(expenseId);
            return true;
        }
        return false;
    }
}
