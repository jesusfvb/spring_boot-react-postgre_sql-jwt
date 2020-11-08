package com.backend.backend.seguaridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/loggin")
@CrossOrigin("*")
public class Loggin {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceI detailsServiceI;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping()
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUserName(), authenticationRequest.getPassword()));
        } catch (Exception e) {
            throw new Exception("Usuario o Contraseña Incorrecta", e);
        }
        final UserDetails userDetails = detailsServiceI.loadUserByUsername(authenticationRequest.getUserName());
        final String jwt = jwtUtil.geberateToken(userDetails);
       
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
