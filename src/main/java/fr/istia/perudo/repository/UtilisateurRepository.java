package fr.istia.perudo.repository;

import fr.istia.perudo.domain.Utilisateur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Utilisateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

}
