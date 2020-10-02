package com.backend.backend.services;

import com.backend.backend.repositorys.Users;
import org.springframework.stereotype.Service;

@Service
public interface UsersServises {

    void  saveUser(Users user);

}
