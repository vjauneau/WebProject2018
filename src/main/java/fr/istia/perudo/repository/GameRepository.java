package fr.istia.perudo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.domain.Plateau;
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

	@Query("select g from UserJeuGame ujg left join ujg.user u left join ujg.game g  where u.pseudo = :login")
	Game findByUser(@Param("login") String login);

}
