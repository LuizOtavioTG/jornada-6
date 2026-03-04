package com.jornada.backend.service.auth;

import com.jornada.backend.domain.auth.model.Role;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.auth.model.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class UserSecurityDetails implements UserDetails {

    private final User user;
    private final Set<GrantedAuthority> authorities;

    public UserSecurityDetails(User user) {
        this.user = user;
        this.authorities = user.getUserRoles().stream()
                .map(UserRole::getRole)
                .map(Role::getName)
                .map(roleName -> new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()))
                .collect(Collectors.toSet());
    }

    public User getUser() {
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getStatus() != null && !user.getStatus().name().startsWith("INATIVO");
    }
}
