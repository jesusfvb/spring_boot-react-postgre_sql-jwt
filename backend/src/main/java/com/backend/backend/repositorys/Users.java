package com.backend.backend.repositorys;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Users implements Serializable {
    public enum Roles{Admin,DrRecidence,VicDecanoDeExtencion,Intructura,Professor,Student,}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String name;
    @Column
    private String solapin;
    @Column
    private String userName;
    @Column
    private String password;
    @Column
    private Roles rol;

    public Users() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSolapin() {
        return solapin;
    }

    public void setSolapin(String solapin) {
        this.solapin = solapin;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Roles getRol() {
        return rol;
    }

    public void setRol(Roles rol) {
        this.rol = rol;
    }

    @Override
    public String toString() {
        return "User id:" + id +" name:"+name+" solapin:"+solapin+" user:"+userName+" password:"+password+" rol:"+rol;
    }
}