package com.jornada.backend.domain.configuracao.repository;

import com.jornada.backend.domain.configuracao.model.ExportJob;
import com.jornada.backend.domain.configuracao.model.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExportJobRepository extends JpaRepository<ExportJob, Long> {
    List<ExportJob> findByStatus(JobStatus status);
}
