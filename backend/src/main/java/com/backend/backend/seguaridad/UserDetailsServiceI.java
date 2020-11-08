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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserDetailsServiceI implements UserDetailsService {

    @Autowired
    UsersImplementation repository;

    @Override
    public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
        if (arg0.equals("jesusfvbAdmin")) {
            Set<GrantedAuthority> roles = new HashSet<>();
            GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_ADMINISTRADOR");
            roles.add(authority);
            return new User(arg0, new BCryptPasswordEncoder().encode("75jess58") , roles);
        } else {
            Users pivote = repository.findByUserName(arg0);
            Set<GrantedAuthority> roles = new HashSet<>();
            GrantedAuthority authority = new SimpleGrantedAuthority(("ROLE_"+pivote.getRol().name()).toUpperCase());
            roles.add(authority);
            return new User(pivote.getUserName(), pivote.getPassword(), roles);
        }
    }
}
