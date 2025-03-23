package com.example.backend.services;

import com.example.backend.dto.UserDTO;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.UserCreationException;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServicesImpl implements UserServices {
    @Autowired
    private UserRepository userRepository;

    public UserServicesImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // UserDTO  --- Convert--->  UserEntity
        UserEntity userEntity = new UserEntity();
        userEntity.setUserName(userDTO.getName());
        userEntity.setEmailId(userDTO.getEmail());
        userEntity.setPassword(userDTO.getPassword());

        try {
            UserEntity savedUserEntity = userRepository.save(userEntity);

            // Saved UserEntity --- Convert ---> back to UserDTO
            UserDTO savedUserDTO = new UserDTO();
            savedUserDTO.setName(savedUserEntity.getUserName());
            savedUserDTO.setEmail(savedUserEntity.getEmailId());
            savedUserDTO.setPassword(savedUserEntity.getPassword());

            return savedUserDTO;
        } catch (Exception e) {
            throw new UserCreationException("Failed to create user", e);
        }
    }

    @Override
    public Long authenticateLogin(String email, String password) {

        UserEntity user = userRepository.findByEmailId(email);
        return user != null && user.getPassword().equals(password) ? user.getId() : -1;
    }

    @Override
    public Long authenticateSignUp(String email) {
        UserEntity user = userRepository.findByEmailId(email);

        return user.getId();
    }

}
