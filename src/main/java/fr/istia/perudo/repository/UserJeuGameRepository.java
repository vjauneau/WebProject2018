package fr.istia.perudo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fr.istia.perudo.domain.Plateau;
import fr.istia.perudo.domain.UserJeuGame;

public interface UserJeuGameRepository extends JpaRepository<UserJeuGame, Long>{
	
	@Query("select ujg from UserJeuGame ujg left join ujg.user u where u.pseudo = :login ")
	UserJeuGame findByUser(@Param("login") String login);

}
