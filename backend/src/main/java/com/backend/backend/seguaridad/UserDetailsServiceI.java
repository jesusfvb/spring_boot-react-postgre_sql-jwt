package com.backend.backend.seguaridad;

import java.util.HashSet;
import java.util.Set;

import com.backend.backend.repositorys.Users;
import com.backend.backend.repositorys.UsersImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserDetailsServiceI implements UserDetailsService {

    @Autowired
    UsersImplementation repository;

    @Override
    public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
        Users pivote = repository.findByUserName(arg0);
        Set<GrantedAuthority> roles = new HashSet<>();
        GrantedAuthority authority = new SimpleGrantedAuthority(pivote.getRol().name());
        roles.add(authority);
        return new User(pivote.getUserName(), pivote.getPassword(), roles);
    }

}
