package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.controller.impl;

import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.dto.OrderDTO;
import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.service.impl.OrderServicesImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/lecos-producer")
public class OrderControllerImpl implements OrderController {

    private final OrderServicesImpl orderServices;

    @Override
    public ResponseEntity<?> sendMessage(@RequestBody OrderDTO orderDTO) {
        orderServices.orderService(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
