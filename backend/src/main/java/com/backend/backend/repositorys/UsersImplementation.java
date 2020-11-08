package com.backend.backend.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersImplementation extends JpaRepository<Users, Integer> {

    @Query("select u from Users u order by u.name")
    List<Users> findAllUserOrderByName();

    @Query("select u from Users u where u.seach like %?1% order by u.name")
    List<Users> searchUser(String text);

    @Query("select u from Users u where u.id not in (select ub.user.id from Ubicacion ub)")
    List<Users> allNoUbicados();

    @Query("select u from Users u where u.rol =4")
    List<Users> allProfesores();

    @Query("select u from Users u where u.rol =5")
    List<Users> allEstudiantes();

    Users findByUserName(String userName);
}
