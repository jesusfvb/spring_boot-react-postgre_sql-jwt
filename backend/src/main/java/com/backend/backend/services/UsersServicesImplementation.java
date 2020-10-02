package com.backend.backend.services;

import com.backend.backend.controls.exceptions.UserException;
import com.backend.backend.repositorys.Users;
import com.backend.backend.repositorys.UsersImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServicesImplementation implements UsersServises{

    @Autowired
    private UsersImplementation repository;

    @Override
    public void saveUser(Users user) {
        if (user==null){
            throw new UserException("saveUser");
        } else {
            repository.save(user);
        }
    }
}
