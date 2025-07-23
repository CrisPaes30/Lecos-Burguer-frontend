package com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.emails.controller.impl;

import com.producer.hamburgueria.Producer.Leco.s.Burguer.apis.emails.dto.EmailDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface EmailController {

    @PostMapping("/send")
    void sendEmail(@RequestBody EmailDTO emailDTO);
}
