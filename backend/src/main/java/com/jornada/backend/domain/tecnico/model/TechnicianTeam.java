package com.jornada.backend.domain.tecnico.model;

import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "technician_teams")
public class TechnicianTeam extends BaseEntity {

    @Column(nullable = false)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "technician_team_members",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> membros = new HashSet<>();

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<User> getMembros() {
        return membros;
    }

    public void setMembros(Set<User> membros) {
        this.membros = membros;
    }
}
