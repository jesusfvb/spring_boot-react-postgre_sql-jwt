package com.backend.backend.controls;
import com.backend.backend.repositorys.Users;
import com.backend.backend.services.UsersServises;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UsersControls {

    @Autowired
    private UsersServises servises;

    @GetMapping()
    private ResponseEntity<Object> allUsers() {
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping()
    private void sabeUsers(@RequestBody Users users) {
    servises.saveUser(users);
    }
}
