package com.proyectojava.proyecto.controllers;

import com.proyectojava.proyecto.dao.UsuarioDao;
import com.proyectojava.proyecto.models.Usuario;
import com.proyectojava.proyecto.utils.JWTUtil;
import org.apache.el.lang.FunctionMapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private JWTUtil jwtutil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario){

        Usuario usuarioLogeado = usuarioDao.obtenerUsuariosPorCredenciales(usuario);

        if (usuarioLogeado != null){

            String tokenJtw = jwtutil.create(String.valueOf(usuarioLogeado.getId()), usuarioLogeado.getEmail());

            return tokenJtw;
        }
        return  "FAIL";
    }

}
