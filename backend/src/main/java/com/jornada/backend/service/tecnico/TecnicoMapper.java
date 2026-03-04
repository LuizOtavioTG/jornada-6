package com.jornada.backend.service.tecnico;

import com.jornada.backend.api.dto.tecnico.DisponibilidadeTecnicoResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianAggregateResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianProfileResponse;
import com.jornada.backend.api.dto.tecnico.TechnicianTeamResponse;
import com.jornada.backend.domain.auth.model.TechnicianProfile;
import com.jornada.backend.domain.auth.model.User;
import com.jornada.backend.domain.tecnico.model.DisponibilidadeTecnico;
import com.jornada.backend.domain.tecnico.model.TechnicianTeam;

import java.util.List;
import java.util.stream.Collectors;

public class TecnicoMapper {

    private TecnicoMapper() {
    }

    public static TechnicianProfileResponse toProfileResponse(TechnicianProfile profile) {
        TechnicianProfileResponse response = new TechnicianProfileResponse();
        response.setId(profile.getId());
        response.setUserId(profile.getUser().getId());
        response.setSpecialty(profile.getSpecialty());
        response.setLevel(profile.getLevel());
        response.setAvailable(profile.getAvailable());
        response.setRegionsServed(profile.getRegionsServed());
        return response;
    }

    public static DisponibilidadeTecnicoResponse toDisponibilidadeResponse(DisponibilidadeTecnico disponibilidade) {
        DisponibilidadeTecnicoResponse response = new DisponibilidadeTecnicoResponse();
        response.setId(disponibilidade.getId());
        response.setTecnicoId(disponibilidade.getTecnico().getId());
        response.setInicio(disponibilidade.getInicio());
        response.setFim(disponibilidade.getFim());
        response.setStatus(disponibilidade.getStatus().name());
        response.setMotivo(disponibilidade.getMotivo());
        return response;
    }

    public static TechnicianTeamResponse toTeamResponse(TechnicianTeam team) {
        TechnicianTeamResponse response = new TechnicianTeamResponse();
        response.setId(team.getId());
        response.setNome(team.getNome());
        response.setDescricao(team.getDescricao());
        response.setMembrosIds(team.getMembros().stream()
                .map(User::getId)
                .collect(Collectors.toSet()));
        return response;
    }

    public static TechnicianAggregateResponse toAggregate(User user, List<TechnicianTeam> teams) {
        TechnicianAggregateResponse response = new TechnicianAggregateResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setStatus(user.getStatus());

        TechnicianProfile profile = user.getTechnicianProfile();
        if (profile != null) {
            response.setSpecialty(profile.getSpecialty());
            response.setLevel(profile.getLevel());
            response.setAvailable(profile.getAvailable());
            response.setRegionsServed(profile.getRegionsServed());
            response.setLevelLabel(mapLevel(profile.getLevel()));
            response.setDisponibilidadeLabel(mapDisponibilidade(profile.getAvailable()));
        }

        response.setTeams(teams.stream()
                .map(TecnicoMapper::toTeamResponse)
                .collect(Collectors.toList()));
        return response;
    }

    private static String mapLevel(String level) {
        if (level == null) {
            return null;
        }
        return switch (level.toLowerCase()) {
            case "junior" -> "Júnior";
            case "pleno" -> "Pleno";
            case "senior" -> "Sênior";
            case "especialista" -> "Especialista";
            default -> level;
        };
    }

    private static String mapDisponibilidade(Boolean available) {
        if (available == null) {
            return "desconhecido";
        }
        return available ? "disponivel" : "indisponivel";
    }
}
