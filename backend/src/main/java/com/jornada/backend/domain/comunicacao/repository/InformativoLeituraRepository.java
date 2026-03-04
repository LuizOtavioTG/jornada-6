package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.InformativoLeitura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InformativoLeituraRepository extends JpaRepository<InformativoLeitura, Long> {
    List<InformativoLeitura> findByUserId(Long userId);
}
