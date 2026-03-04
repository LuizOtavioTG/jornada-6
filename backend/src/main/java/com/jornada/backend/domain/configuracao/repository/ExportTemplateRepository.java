package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.ExportFormato;
import com.jornada.backend.domain.configuracao.model.ExportTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExportTemplateRepository extends JpaRepository<ExportTemplate, Long> {
    Optional<ExportTemplate> findByNome(String nome);
    List<ExportTemplate> findByFormato(ExportFormato formato);
}
