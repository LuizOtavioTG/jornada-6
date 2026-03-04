package com.jornada.backend.domain.comunicacao.repository;

import com.jornada.backend.domain.comunicacao.model.InformativoDestino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InformativoDestinoRepository extends JpaRepository<InformativoDestino, Long> {
    List<InformativoDestino> findByInformativoId(Long informativoId);
}
