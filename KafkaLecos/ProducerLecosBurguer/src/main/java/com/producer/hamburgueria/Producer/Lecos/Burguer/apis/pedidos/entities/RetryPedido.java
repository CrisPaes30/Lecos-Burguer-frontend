package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "retry_pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RetryPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_retry")
    private Long id;

    private String cliente;

    private String contato;

    private String endereco;

    @Column(name = "complemento_endereco")
    private String complementoEndereco;

    private String bairro;

    private String cidade;

    private String referencia;

    @Column(name = "forma_pagamento")
    private String formaPagamento;

    @Column(name = "taxa_entrega", precision = 10, scale = 2)
    private Double taxaEntrega;

    @Column(name = "preco_total", precision = 10, scale = 2)
    private Double precoTotal;

    @Column(columnDefinition = "jsonb")
    private String payload; // JSON completo como string

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "retryPedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RetryPedidoProduto> produtos;
}
