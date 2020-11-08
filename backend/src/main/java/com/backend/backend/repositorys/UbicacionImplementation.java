package com.backend.backend.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UbicacionImplementation extends JpaRepository< Ubicacion,Integer> {

    @Query("select u from Ubicacion u order by u.user.name")
    List<Ubicacion> findAllUbicacionOrderByUserName();

    @Query("select u from Ubicacion u where u.seach like %?1% order by u.user.name")
    List<Ubicacion> searchUbicacion(String text);

    @Query("select u from Ubicacion u where u.user.id in (select us.id from Users us where us.rol= 5)")
    List<Ubicacion> allEstudiantes();

}
