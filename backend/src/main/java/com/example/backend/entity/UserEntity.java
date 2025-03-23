package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@JsonIgnoreProperties({"expanceList"})
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username", nullable = false)
    private String userName;

    @Column(name = "email")
    private String emailId;

    private String password;

    @OneToMany(targetEntity = ExpanceEntity.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = false)
    @JoinColumn(name = "ue_fk")
    private List<ExpanceEntity> expanceList;


}
