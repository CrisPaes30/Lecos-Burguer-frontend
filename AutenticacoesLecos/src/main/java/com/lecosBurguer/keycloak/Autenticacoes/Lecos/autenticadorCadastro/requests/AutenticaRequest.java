package com.lecosBurguer.keycloak.Autenticacoes.Lecos.AutenticadorCadastro.Requests.AutenticaRequest;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class AutenticaRequest {

    @NotBlank(message = "O campo usuario deve ser preenchido.")
    private String usuario;

    @NotBlank(message = "O campo email deve ser preenchido.")
    private String email;

    @NotBlank(message = "O campo nome deve ser preenchido.")
    private String nome;

    @NotBlank(message = "O campo sobrenome deve ser preenchido.")
    private String sobrenome;

    @NotBlank(message = "O campo role deve ser preenchido.")
    private String Role;

    @NotBlank(message = "O campo senha deve ser preenchido.")
    private String senha;
}
