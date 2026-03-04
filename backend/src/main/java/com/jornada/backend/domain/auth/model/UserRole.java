package com.jornada.backend.domain.auth.model;

import com.jornada.backend.domain.common.model.BaseEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user_roles")
public class UserRole extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_role_user"))
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false, foreignKey = @ForeignKey(name = "fk_user_role_role"))
    private Role role;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "user_role_grants", joinColumns = @JoinColumn(name = "user_role_id"))
    @Column(name = "grant_value")
    private Set<String> grants = new HashSet<>();

    @Column
    private OffsetDateTime grantedAt;

    @Column
    private Long grantedByUserId;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<String> getGrants() {
        return grants;
    }

    public void setGrants(Set<String> grants) {
        this.grants = grants;
    }

    public OffsetDateTime getGrantedAt() {
        return grantedAt;
    }

    public void setGrantedAt(OffsetDateTime grantedAt) {
        this.grantedAt = grantedAt;
    }

    public Long getGrantedByUserId() {
        return grantedByUserId;
    }

    public void setGrantedByUserId(Long grantedByUserId) {
        this.grantedByUserId = grantedByUserId;
    }
}
