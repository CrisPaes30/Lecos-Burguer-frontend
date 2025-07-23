package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "retry_pedido_produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RetryPedidoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_retry")
    private RetryPedido retryPedido;

    @Column(name = "nome_produto")
    private String nomeProduto;

    @Column(name = "complemento_lanche")
    private String complementoLanche;

    private String observacao;

    @Column(name = "preco_unitario", precision = 10, scale = 2)
    private Double precoUnitario;
}
