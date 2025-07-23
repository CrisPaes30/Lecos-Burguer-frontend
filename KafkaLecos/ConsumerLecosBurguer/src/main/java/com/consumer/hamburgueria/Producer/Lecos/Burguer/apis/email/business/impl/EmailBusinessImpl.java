package com.consumer.hamburgueria.Producer.Lecos.Burguer.apis.email.service.impl;

import com.consumer.hamburgueria.Producer.Lecos.Burguer.apis.email.dto.EmailDTO;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private EmailService emailService;

    @Override
    public void sendEmail(EmailDTO emailDTO) {

        log.info("Mensagem recebida do Kafka: " + message);

        // Extrair os dados
        String[] parts = message.split(";", 3);
        EmailDTO email = new EmailDTO();
        email.setTo(parts[0]);
        email.setSubject(parts[1]);
        email.setBody(parts[2]);

        // Enviar o e-mail
        emailService.sendSimpleEmail(email);
    }
}
