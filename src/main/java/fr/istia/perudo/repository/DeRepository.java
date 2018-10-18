package fr.istia.perudo.repository;

import fr.istia.perudo.domain.De;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the De entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeRepository extends JpaRepository<De, Long> {

}
