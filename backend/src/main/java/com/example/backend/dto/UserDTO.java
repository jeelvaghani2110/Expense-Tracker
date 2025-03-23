package com.example.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
    private String name;
    private String email;
    private String password;
    private String confirmPassword;
}
