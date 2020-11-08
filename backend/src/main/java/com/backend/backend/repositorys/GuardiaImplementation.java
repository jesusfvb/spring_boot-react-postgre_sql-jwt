package com.backend.backend.repositorys;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardiaImplementation extends JpaRepository<Guardia, Integer> {

    @Query("select g from Guardia g order by g.representante.name")
    List<Guardia> findAllOrderByRepresentanteName();

    @Query("select g from Guardia g where g.seach like %?1% order by g.representante.name")
    List<Guardia> seachAll(String text);

    @Query("select g from Guardia g where g.representante.userName=?1")
    List<Guardia> allForUserName(String userName);

    @Query(value =  "select gu.* from guardia gu join guardia_integrantes gi on gi.guardia_id = gu.id join users u ON u.id = gi.integrantes_id where u.user_name=?1",nativeQuery = true)
    List<Guardia> allForUserNameEstudiante(String userName);
}
