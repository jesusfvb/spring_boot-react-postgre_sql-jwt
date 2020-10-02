package com.backend.backend.repositorys;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuarteleriaImplementation extends JpaRepository<Cuarteleria,Integer> {
}
