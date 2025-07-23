package com.lecosBurguer.keycloak.Autenticacoes.Lecos.AutenticadorCadastro.impl;

import com.lecosBurguer.keycloak.Autenticacoes.Lecos.AutenticadorCadastro.AutenticaController.AutenticaController;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.AutenticadorCadastro.Requests.AutenticaRequest.AutenticaRequest;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.AutenticadorCadastro.Response.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/authentication registration")
public class AutenticaControllerImpl implements AutenticaController {


    @Override
    public ResponseEntity<ResponseDTO> autentica(AutenticaRequest autenticaRequest) {
        return null;
    }
}
