package com.backend.backend.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersImplementation extends JpaRepository<Users,Integer> {

    @Query("select u from Users u order by u.name")
    List<Users> findAllUserOrderByName();

}
