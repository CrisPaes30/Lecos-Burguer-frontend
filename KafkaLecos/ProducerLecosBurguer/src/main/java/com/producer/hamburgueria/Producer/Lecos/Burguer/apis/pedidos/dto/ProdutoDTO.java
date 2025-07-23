package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ProdutoDTO {

    private String nomeProduto;
    private List<ComplementoDTO> complementoLanche;
    private String observacao;
    private Double precoUnitario;
}
