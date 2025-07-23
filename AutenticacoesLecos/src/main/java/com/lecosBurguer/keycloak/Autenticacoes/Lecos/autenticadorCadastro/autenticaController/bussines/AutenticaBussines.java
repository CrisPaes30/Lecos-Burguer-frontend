package com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.autenticaController.bussines;

import com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.exceptions.BusinessException;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.requests.AutenticaRequest;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.requests.dto.AutenticaRequestDTO;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.response.*;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.service.impl.AutenticaServiceImpl;
import com.lecosBurguer.keycloak.Autenticacoes.Lecos.utils.MensagemResolver;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.config.CadastroConfig.MESSAGE_SOURCE_BEAN_IDENTIFIER;
import static com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.enuns.KeyEnums.KEY_0001;
import static com.lecosBurguer.keycloak.Autenticacoes.Lecos.autenticadorCadastro.enuns.KeyEnums.KEY_0006;

@Service
public class AutenticaBussines {

    private final AutenticaServiceImpl autenticaService;

    private final ReloadableResourceBundleMessageSource messageSource;

    private final MensagemResolver resolver;

    private String message;

    public AutenticaBussines(AutenticaServiceImpl autenticaService,
                            @Qualifier(MESSAGE_SOURCE_BEAN_IDENTIFIER) ReloadableResourceBundleMessageSource messageSource,
                            MensagemResolver resolver) {
        this.autenticaService = autenticaService;
        this.messageSource = messageSource;
        this.resolver = resolver;
    }

    public ResponseDTO
    createResponse(AutenticaRequestDTO requestDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        Data data = new Data();
        List<Item> items = new ArrayList<>();

        requestDTO.getItem().forEach(requestItem -> {
            Item item = new Item();
            MessageData messageData = new MessageData();

            try {
                autenticaService.cadastroUsuarioKeyCloak(requestDTO);

                String nomeCadastro = requestDTO.getItem().get(0).getAutenticaRequest().getUsuario();
                message = resolver.getMensagem(KEY_0006.getCode(), nomeCadastro);

                messageData.setMessage(message);
                item.setData(messageData);

            } catch (BusinessException e) {
                message = messageSource.getMessage(e.getCode(), e.getArgs(), LocaleContextHolder.getLocale());

                ErrorDetail error = new ErrorDetail();
                error.setCode(e.getCode());
                error.setMessage(message);

                if(e.getCode().equals(KEY_0001.getCode())) {
                    error.setAction(null);
                } else {
                    error.setAction("Corrija os dados informados e tente novamente.");
                }

                List<ErrorDetail> errors = new ArrayList<>();
                errors.add(error);

                item.setError(errors);
            }

            items.add(item);
        });

        data.setItems(items);
        responseDTO.setData(data);
        return responseDTO;
    }
}
