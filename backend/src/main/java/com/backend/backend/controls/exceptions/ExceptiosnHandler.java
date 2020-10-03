package com.backend.backend.controls.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptiosnHandler {

    @ExceptionHandler(value = UserException.class)
    public ResponseEntity <Object> userException (UserException e){
        return  new ResponseEntity<>(e, e.getStatus());
    
    }
    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity <Object> JnsoException (Exception e){
        Exception pivote = new Exception("Objeto Recivido Incorrecto");
        return  new ResponseEntity<>(pivote, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }

}
