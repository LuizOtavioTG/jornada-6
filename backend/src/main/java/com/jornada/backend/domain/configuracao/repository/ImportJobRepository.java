package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.ImportJob;
import com.jornada.backend.domain.configuracao.model.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImportJobRepository extends JpaRepository<ImportJob, Long> {
    List<ImportJob> findByStatus(JobStatus status);
}
