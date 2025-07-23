package com.consumer.hamburgueria.Producer.Lecos.Burguer.apis.email.service.impl;

import com.consumer.hamburgueria.Producer.Lecos.Burguer.apis.email.dto.EmailDTO;
import org.springframework.kafka.annotation.KafkaListener;

public interface EmailService {

    @KafkaListener(topics = "email.send", groupId = "email-service-group")
    void sendEmail(EmailDTO emailDTO);
}
