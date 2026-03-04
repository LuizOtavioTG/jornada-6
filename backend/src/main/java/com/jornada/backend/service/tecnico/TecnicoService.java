package com.jornada.backend.service.tecnico;

import com.jornada.backend.api.dto.tecnico.DisponibilidadeTecnicoRequest;
import com.jornada.backend.api.dto.tecnico.DisponibilidadeTecnicoResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianAggregateResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianProfileRequest;
import com.jornada.backend.api.dto.tecnico.TechnicianProfileResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianTeamRequest;
import com.jornada.backend.api.dto.tecnico.TechnicianTeamResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianUpdateRequest;
import com.jornada.backend.domain.auth.model.TechnicianProfile;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.auth.repository.TechnicianProfileRepository;
import com.jornada.backend.domain.auth.repository.UserRepository;
import com.jornada.backend.domain.tecnico.model.DisponibilidadeStatus;
import com.jornada.backend.domain.tecnico.model.DisponibilidadeTecnico;
import com.jornada.backend.domain.tecnico.model.TechnicianTeam;
import com.jornada.backend.domain.tecnico.repository.DisponibilidadeTecnicoRepository;
import com.jornada.backend.domain.tecnico.repository.TechnicianTeamRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TecnicoService {

    private final TechnicianProfileRepository technicianProfileRepository;
    private final UserRepository userRepository;
    private final DisponibilidadeTecnicoRepository disponibilidadeTecnicoRepository;
    private final TechnicianTeamRepository technicianTeamRepository;

    public TecnicoService(TechnicianProfileRepository technicianProfileRepository,
                          UserRepository userRepository,
                          DisponibilidadeTecnicoRepository disponibilidadeTecnicoRepository,
                          TechnicianTeamRepository technicianTeamRepository) {
        this.technicianProfileRepository = technicianProfileRepository;
        this.userRepository = userRepository;
        this.disponibilidadeTecnicoRepository = disponibilidadeTecnicoRepository;
        this.technicianTeamRepository = technicianTeamRepository;
    }

    @Transactional
    public TechnicianProfileResponse salvarPerfil(TechnicianProfileRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        TechnicianProfile profile = technicianProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    TechnicianProfile novo = new TechnicianProfile();
                    novo.setUser(user);
                    return novo;
                });

        profile.setSpecialty(request.getSpecialty());
        profile.setLevel(request.getLevel());
        profile.setAvailable(request.getAvailable());
        Set<String> regions = request.getRegionsServed() != null ? request.getRegionsServed() : new HashSet<>();
        profile.setRegionsServed(regions);

        technicianProfileRepository.save(profile);
        return TecnicoMapper.toProfileResponse(profile);
    }

    @Transactional(readOnly = true)
    public List<TechnicianProfileResponse> listarPerfis() {
        return technicianProfileRepository.findAll().stream()
                .map(TecnicoMapper::toProfileResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TechnicianAggregateResponse buscarTecnico(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        List<TechnicianTeam> teams = technicianTeamRepository.findAll().stream()
                .filter(team -> team.getMembros().contains(user))
                .collect(Collectors.toList());
        return TecnicoMapper.toAggregate(user, teams);
    }

    @Transactional(readOnly = true)
    public List<TechnicianAggregateResponse> listarTecnicos() {
        return userRepository.findAll().stream()
                .filter(user -> user.getTechnicianProfile() != null)
                .map(user -> {
                    List<TechnicianTeam> teams = technicianTeamRepository.findAll().stream()
                            .filter(team -> team.getMembros().contains(user))
                            .collect(Collectors.toList());
                    return TecnicoMapper.toAggregate(user, teams);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public DisponibilidadeTecnicoResponse registrarDisponibilidade(DisponibilidadeTecnicoRequest request) {
        User tecnico = userRepository.findById(request.getTecnicoId())
                .orElseThrow(() -> new IllegalArgumentException("Técnico não encontrado"));

        DisponibilidadeTecnico disponibilidade = new DisponibilidadeTecnico();
        disponibilidade.setTecnico(tecnico);
        disponibilidade.setInicio(request.getInicio());
        disponibilidade.setFim(request.getFim());
        disponibilidade.setStatus(request.getStatus() != null ? DisponibilidadeStatus.valueOf(request.getStatus()) : DisponibilidadeStatus.DISPONIVEL);
        disponibilidade.setMotivo(request.getMotivo());

        disponibilidadeTecnicoRepository.save(disponibilidade);
        return TecnicoMapper.toDisponibilidadeResponse(disponibilidade);
    }

    @Transactional(readOnly = true)
    public List<DisponibilidadeTecnicoResponse> listarDisponibilidades(Long tecnicoId) {
        return disponibilidadeTecnicoRepository.findByTecnicoId(tecnicoId).stream()
                .map(TecnicoMapper::toDisponibilidadeResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TechnicianTeamResponse salvarEquipe(TechnicianTeamRequest request) {
        TechnicianTeam team = new TechnicianTeam();
        team.setNome(request.getNome());
        team.setDescricao(request.getDescricao());
        if (request.getMembrosIds() != null) {
            Set<User> membros = request.getMembrosIds().stream()
                    .map(id -> userRepository.findById(id)
                            .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id)))
                    .collect(Collectors.toSet());
            team.setMembros(membros);
        }
        technicianTeamRepository.save(team);
        return TecnicoMapper.toTeamResponse(team);
    }

    @Transactional(readOnly = true)
    public List<TechnicianTeamResponse> listarEquipes() {
        return technicianTeamRepository.findAll().stream()
                .map(TecnicoMapper::toTeamResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TechnicianAggregateResponse atualizarTecnico(TechnicianUpdateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }

        TechnicianProfile profile = technicianProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    TechnicianProfile novo = new TechnicianProfile();
                    novo.setUser(user);
                    return novo;
                });

        profile.setSpecialty(request.getSpecialty());
        profile.setLevel(request.getLevel());
        profile.setAvailable(request.getAvailable());
        profile.setRegionsServed(request.getRegionsServed() != null ? request.getRegionsServed() : new HashSet<>());

        technicianProfileRepository.save(profile);

        List<TechnicianTeam> teams = technicianTeamRepository.findAll().stream()
                .filter(team -> team.getMembros().contains(user))
                .collect(Collectors.toList());
        return TecnicoMapper.toAggregate(user, teams);
    }

    @Transactional
    public void removerTecnicoPerfil(Long userId) {
        TechnicianProfile profile = technicianProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Perfil de técnico não encontrado"));
        technicianProfileRepository.delete(profile);
    }
}
