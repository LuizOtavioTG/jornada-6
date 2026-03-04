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

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "role_permissions")
public class RolePermission extends BaseEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false, foreignKey = @ForeignKey(name = "fk_role_permission_role"))
    private Role role;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id", nullable = false, foreignKey = @ForeignKey(name = "fk_role_permission_permission"))
    private Permission permission;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "role_permission_grants", joinColumns = @JoinColumn(name = "role_permission_id"))
    @Column(name = "grant_value")
    private Set<String> grants = new HashSet<>();

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }

    public Set<String> getGrants() {
        return grants;
    }

    public void setGrants(Set<String> grants) {
        this.grants = grants;
    }
}
