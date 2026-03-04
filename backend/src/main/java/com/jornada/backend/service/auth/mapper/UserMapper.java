package com.jornada.backend.service.auth.mapper;

import com.jornada.backend.api.dto.auth.UserResponse;
import com.jornada.backend.domain.auth.model.User;

import java.util.stream.Collectors;

public class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setStatus(user.getStatus());
        response.setEnterpriseId(user.getEnterpriseId());
        response.setClienteId(user.getClienteId());
        response.setRoles(user.getUserRoles().stream()
                .map(userRole -> userRole.getRole().getName())
                .collect(Collectors.toList()));
        return response;
    }
}
