package fr.istia.perudo.repository;

import fr.istia.perudo.domain.Utilisateur;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Utilisateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
	
	@Query("select u from UserJeuGame ujg left join ujg.user u left join ujg.game g  where g.id = :id_game")
	List<Utilisateur> findByGame( @Param("id_game") Long idGame);
	
	@Query("select u from Utilisateur u where u.pseudo = :login")
	Utilisateur findByPseudo(@Param("login") String login);

}
