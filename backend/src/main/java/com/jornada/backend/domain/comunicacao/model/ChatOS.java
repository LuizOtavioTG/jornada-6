package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import com.jornada.backend.domain.ordemservico.model.OrdemServico;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "chat_os")
public class ChatOS extends BaseEntity {

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "os_id", nullable = false, foreignKey = @ForeignKey(name = "fk_chat_os"))
    private OrdemServico ordemServico;

    @Column(nullable = false)
    private String assunto;

    @OneToMany(mappedBy = "chat")
    private Set<MensagemInterna> mensagens = new HashSet<>();

    public OrdemServico getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(OrdemServico ordemServico) {
        this.ordemServico = ordemServico;
    }

    public String getAssunto() {
        return assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public Set<MensagemInterna> getMensagens() {
        return mensagens;
    }

    public void setMensagens(Set<MensagemInterna> mensagens) {
        this.mensagens = mensagens;
    }
}
