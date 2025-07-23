package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.emails.controller.impl;

import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.emails.dto.EmailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/lecos-email")
public class EmailControllerImpl implements EmailController {

    private static final String TOPIC = "email.send";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public void sendEmail(EmailDTO email) {
        String message = String.format("%s;%s;%s", email.getTo(), email.getSubject(), email.getBody());
        kafkaTemplate.send(TOPIC, message);
        System.out.println("Mensagem enviada para o tópico Kafka: " + message);
    }
}
