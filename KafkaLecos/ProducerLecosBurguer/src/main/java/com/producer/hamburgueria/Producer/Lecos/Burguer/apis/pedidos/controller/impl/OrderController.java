package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.controller.impl;

import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.pedidos.dto.OrderDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface OrderController {

    @PostMapping
    ResponseEntity<?> sendMessage(@RequestBody OrderDTO orderDTO);
}
