package com.jornada.backend.domain.comunicacao.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;

@Entity
@Table(name = "mensagens_internas")
public class MensagemInterna extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false, foreignKey = @ForeignKey(name = "fk_mensagem_chat"))
    private ChatOS chat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", foreignKey = @ForeignKey(name = "fk_mensagem_autor"))
    private User autor;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @Column(nullable = false)
    private OffsetDateTime enviadoEm;

    public ChatOS getChat() {
        return chat;
    }

    public void setChat(ChatOS chat) {
        this.chat = chat;
    }

    public User getAutor() {
        return autor;
    }

    public void setAutor(User autor) {
        this.autor = autor;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public OffsetDateTime getEnviadoEm() {
        return enviadoEm;
    }

    public void setEnviadoEm(OffsetDateTime enviadoEm) {
        this.enviadoEm = enviadoEm;
    }
}
