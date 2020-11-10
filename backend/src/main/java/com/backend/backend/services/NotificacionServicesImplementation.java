package com.backend.backend.services;

import java.util.Arrays;
import java.util.List;

import com.backend.backend.controls.exceptions.NotificacionException;
import com.backend.backend.repositorys.Notificaciones;
import com.backend.backend.repositorys.NotificacionesImplementation;
import com.backend.backend.repositorys.UsersImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificacionServicesImplementation implements NotificacionServises {

    @Autowired
    private NotificacionesImplementation repository;

    @Autowired
    private UsersImplementation repositoryU;

    @Override
    public List<Notificaciones> allNotificacionesByRemitente(String userName) {
        if (userName == null) {
            throw new NotificacionException("Dato incorrecto");
        } else {
            return repository.findAllByRemitenteID(userName);
        }
    }

    @Override
    public List<Notificaciones> allNotificacionesByDestinatario(String userName) {
        if (userName == null) {
            throw new NotificacionException("Dato incorrecto");
        } else {
            return repository.findAllByDestinatarioID(userName);
        }
    }

    @Override
    public void saveNotificacion(Notificaciones notificacion) {
        if (notificacion.getId() != null) {
            throw new NotificacionException("Dato incorrecto para Guardar");
        } else {
            notificacion.setRemitente(repositoryU.findByUserName(notificacion.getRemitente().getUserName()));
            repository.save(notificacion);
        }
    }

    @Override
    public void updateNotificacion(Notificaciones notificacion) {
        if (notificacion.getId() == null) {
            throw new NotificacionException("Dato incorrecto para Modificar");
        } else {
            repository.save(notificacion);
        }
    }

    @Override
    public void deleteNotificacion(Integer idNs[], String userName) {

        if (idNs == null || idNs.length < 0 || userName == null) {
            throw new NotificacionException("Error al Eliminar");
        } else {
            List<Notificaciones> lista = repository.findAllById(Arrays.asList(idNs));
            lista.forEach(pivote -> {
                Boolean modificado = false;
                if (pivote.getRemitente() != null) {
                    if (userName.equals( pivote.getRemitente().getUserName())) {
                        pivote.setRemitente(null);
                        modificado = true;
                    }
                }
                if (pivote.getDestinatario() != null) {
                    if (userName.equals( pivote.getDestinatario().getUserName())) {
                        pivote.setDestinatario(null);
                        modificado = true;
                    }
                }

                if (modificado) {
                    if (pivote.getRemitente() == null && pivote.getDestinatario() == null) {
                        repository.delete(pivote);
                    } else {
                        repository.save(pivote);
                    }
                }
            });
        }
    }
}
