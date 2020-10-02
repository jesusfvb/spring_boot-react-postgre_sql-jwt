package com.backend.backend.controls.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptiosnHandler {

    @ExceptionHandler(value = UserException.class)
    public ResponseEntity <Object> userException (UserException e){
        return  new ResponseEntity<>(e.getMessage(), e.getStatus());
    }

}
