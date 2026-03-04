package com.jornada.backend.config.bootstrap;

import com.jornada.backend.domain.auth.model.Permission;
import com.jornada.backend.domain.auth.model.Role;
import com.jornada.backend.domain.auth.model.RolePermission;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.auth.model.UserRole;
import com.jornada.backend.domain.auth.model.UserStatus;
import com.jornada.backend.domain.auth.repository.PermissionRepository;
import com.jornada.backend.domain.auth.repository.RoleRepository;
import com.jornada.backend.domain.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(PermissionRepository permissionRepository,
                                      RoleRepository roleRepository,
                                      UserRepository userRepository,
                                      PasswordEncoder passwordEncoder) {
        boolean skip = Boolean.parseBoolean(System.getenv().getOrDefault("APP_SKIP_DATA_SEED", "false"));
        if (skip) {
            return args -> {
            };
        }
        return args -> initialize(permissionRepository, roleRepository, userRepository, passwordEncoder);
    }

    @Transactional
    void initialize(PermissionRepository permissionRepository,
                    RoleRepository roleRepository,
                    UserRepository userRepository,
                    PasswordEncoder passwordEncoder) {
        Map<String, Permission> permissions = ensurePermissions(permissionRepository, List.of(
                "users.read", "users.write", "clients.manage", "technicians.manage",
                "orders.manage", "reports.view"
        ));

        Role adminRole = ensureRole(roleRepository, permissions,
                "ADMIN", "Administrador do sistema",
                permissions.keySet());

        ensureRole(roleRepository, permissions,
                "FUNCIONARIO", "Usuário interno",
                Set.of("clients.manage", "orders.manage", "reports.view"));

        ensureRole(roleRepository, permissions,
                "TECNICO", "Técnico operacional",
                Set.of("orders.manage", "reports.view"));

        ensureRole(roleRepository, permissions,
                "CLIENTE", "Portal do cliente",
                Set.of("reports.view"));

        ensureAdminUser(userRepository, passwordEncoder, adminRole);
    }

    private Map<String, Permission> ensurePermissions(PermissionRepository permissionRepository, List<String> permissionNames) {
        Map<String, Permission> existing = permissionRepository.findAll().stream()
                .collect(Collectors.toMap(Permission::getName, p -> p));

        Map<String, Permission> result = new HashMap<>(existing);
        for (String name : permissionNames) {
            result.computeIfAbsent(name, key -> {
                Permission permission = new Permission();
                permission.setName(key);
                permission.setDescription("Permissão " + key);
                return permissionRepository.save(permission);
            });
        }
        return result;
    }

    private Role ensureRole(RoleRepository roleRepository,
                            Map<String, Permission> permissions,
                            String roleName,
                            String description,
                            Set<String> permissionKeys) {
        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(roleName);
                    newRole.setDescription(description);
                    return newRole;
                });

        // Garantir entidade gerenciada para evitar LazyInitializationException/versão nula
        if (role.getId() != null) {
            role = roleRepository.findById(role.getId()).orElse(role);
        }

        role.setDescription(description);
        // Evita LazyInitializationException ao limpar coleção carregada tardiamente
        role.setRolePermissions(new java.util.HashSet<>());

        for (String permissionKey : permissionKeys) {
            Permission permission = permissions.get(permissionKey);
            if (permission == null) {
                continue;
            }
            RolePermission link = new RolePermission();
            link.setRole(role);
            link.setPermission(permission);
            role.getRolePermissions().add(link);
        }

        return roleRepository.save(role);
    }

    private void ensureAdminUser(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder,
                                 Role adminRole) {
        String adminEmail = "admin@jornada.local";
        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User user = new User();
        user.setFullName("Administrador Jornada");
        user.setEmail(adminEmail);
        user.setPassword(passwordEncoder.encode("Admin@123"));
        user.setStatus(UserStatus.ACTIVE);

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(adminRole);
        userRole.setGrantedAt(OffsetDateTime.now());
        userRole.setGrantedByUserId(null);

        user.getUserRoles().add(userRole);

        userRepository.save(user);
    }
}
