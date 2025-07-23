package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.dto.OrderDTO;
import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.entities.RetryPedido;
import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.entities.RetryPedidoProduto;
import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.repository.RetryPedidoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Log4j2
@Service
public class OrderServicesImpl implements OrderServices {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    private final RetryPedidoRepository retryPedidoRepository;

    private static final String PEDIDOS_TOPIC = "lecos-pedidos-topic";

    @Override
    @Retryable(
            value = { RuntimeException.class },
            maxAttempts = 3,
            backoff = @Backoff(delay = 2000, multiplier = 2)
    )
    public void orderService(OrderDTO orderDTO) {
        try {
            String orderJson = objectMapper.writeValueAsString(orderDTO);

            kafkaTemplate.send(PEDIDOS_TOPIC, orderJson)
                    .whenComplete((sendResult, exception) -> {
                        if (exception == null) {
                            log.info("Pedido enviado para Kafka com sucesso. Topic: {}, Partition: {}, Offset: {}",
                                    sendResult.getRecordMetadata().topic(),
                                    sendResult.getRecordMetadata().partition(),
                                    sendResult.getRecordMetadata().offset());
                        } else {
                            log.error("Falha ao enviar pedido para Kafka", exception);
                            throw new RuntimeException("Falha no envio Kafka", exception);
                        }
                    });

        } catch (JsonProcessingException e) {
            log.error("Erro ao serializar OrderDTO para JSON", e);
            throw new RuntimeException("Erro ao enviar pedido para Kafka", e);
        }
    }

    //Fallback automático chamado após todas as tentativas falharem
    @Recover
    public void fallback(RuntimeException e, OrderDTO orderDTO) throws JsonProcessingException {
        log.error("Todas as tentativas de enviar ao Kafka falharam. Salvando no banco para retry manual. Erro: {}", e.getMessage());

        RetryPedido retryPedido = RetryPedido.builder()
                .cliente(orderDTO.getCliente())
                .contato(orderDTO.getContato())
                .endereco(orderDTO.getEndereco())
                .complementoEndereco(orderDTO.getComplementoEndereco())
                .bairro(orderDTO.getBairro())
                .cidade(orderDTO.getCidade())
                .referencia(orderDTO.getReferencia())
                .formaPagamento(orderDTO.getFormaPagamento())
                .taxaEntrega(orderDTO.getTaxaEntrega())
                .precoTotal(orderDTO.getPrecoTotal())
                .payload(new ObjectMapper().writeValueAsString(orderDTO))
                .build();

        List<RetryPedidoProduto> produtos = orderDTO.getProdutos().stream()
                .map(produto -> RetryPedidoProduto.builder()
                        .retryPedido(retryPedido)
                        .nomeProduto(produto.getNomeProduto())
                        .complementoLanche(produto.getComplementoLanche().toString())
                        .observacao(produto.getObservacao())
                        .precoUnitario(produto.getPrecoUnitario())
                        .build()
                ).toList();

        retryPedido.setProdutos(produtos);

        retryPedidoRepository.save(retryPedido);
    }

}
