package com.jornada.backend.api.dto.tecnico;

import com.jornada.backend.domain.auth.model.UserStatus;

import java.util.List;
import java.util.Set;

public class TechnicianAggregateResponse {

    private Long id;
    private String fullName;
    private String email;
    private UserStatus status;
    private String specialty;
    private String level;
    private String levelLabel;
    private Boolean available;
    private String disponibilidadeLabel;
    private Set<String> regionsServed;
    private List<TechnicianTeamResponse> teams;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getLevelLabel() {
        return levelLabel;
    }

    public void setLevelLabel(String levelLabel) {
        this.levelLabel = levelLabel;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getDisponibilidadeLabel() {
        return disponibilidadeLabel;
    }

    public void setDisponibilidadeLabel(String disponibilidadeLabel) {
        this.disponibilidadeLabel = disponibilidadeLabel;
    }

    public Set<String> getRegionsServed() {
        return regionsServed;
    }

    public void setRegionsServed(Set<String> regionsServed) {
        this.regionsServed = regionsServed;
    }

    public List<TechnicianTeamResponse> getTeams() {
        return teams;
    }

    public void setTeams(List<TechnicianTeamResponse> teams) {
        this.teams = teams;
    }
}
