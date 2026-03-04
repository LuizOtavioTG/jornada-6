package com.jornada.backend.domain.auth.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "technician_profiles")
public class TechnicianProfile extends BaseEntity {

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_technician_profile_user"))
    private User user;

    @Column(length = 120)
    private String specialty;

    @Column(length = 80)
    private String level;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "technician_regions", joinColumns = @JoinColumn(name = "technician_profile_id"))
    @Column(name = "region_code")
    private Set<String> regionsServed = new HashSet<>();

    @Column
    private Boolean available;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Set<String> getRegionsServed() {
        return regionsServed;
    }

    public void setRegionsServed(Set<String> regionsServed) {
        this.regionsServed = regionsServed;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
