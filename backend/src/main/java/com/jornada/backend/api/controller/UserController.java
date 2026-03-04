package com.jornada.backend.api.controller;

import com.jornada.backend.api.dto.auth.CreateUserRequest;
import com.jornada.backend.api.dto.auth.UpdatePasswordRequest;
import com.jornada.backend.api.dto.auth.UpdateUserRequest;
import com.jornada.backend.api.dto.auth.UserResponse;
import com.jornada.backend.service.auth.UserSecurityDetails;
import com.jornada.backend.service.auth.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> listUsers() {
        return ResponseEntity.ok(userService.listUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request,
                                                   @AuthenticationPrincipal UserSecurityDetails currentUser) {
        Long actingUserId = currentUser != null ? currentUser.getUser().getId() : null;
        return ResponseEntity.ok(userService.createUser(request, actingUserId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id,
                                                   @Valid @RequestBody UpdateUserRequest request,
                                                   @AuthenticationPrincipal UserSecurityDetails currentUser) {
        Long actingUserId = currentUser != null ? currentUser.getUser().getId() : null;
        return ResponseEntity.ok(userService.updateUser(id, request, actingUserId));
    }

    @PostMapping("/{id}/password")
    public ResponseEntity<Void> updatePassword(@PathVariable Long id,
                                               @Valid @RequestBody UpdatePasswordRequest request) {
        userService.updatePassword(id, request.getNewPassword());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivate(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.noContent().build();
    }
}
