package com.jornada.backend.api.dto.tecnico;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public class TechnicianProfileRequest {

    @NotNull
    private Long userId;

    private String specialty;
    private String level;
    private Boolean available;
    private Set<String> regionsServed;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Set<String> getRegionsServed() {
        return regionsServed;
    }

    public void setRegionsServed(Set<String> regionsServed) {
        this.regionsServed = regionsServed;
    }
}
