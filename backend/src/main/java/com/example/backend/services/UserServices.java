package com.example.backend.services;

import com.example.backend.dto.UserDTO;

public interface UserServices {
    UserDTO createUser(UserDTO userDTO);

    Long authenticateLogin(String email, String password);

    Long authenticateSignUp(String email);
}


