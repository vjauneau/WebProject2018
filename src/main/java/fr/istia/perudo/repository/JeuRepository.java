package fr.istia.perudo.repository;

import fr.istia.perudo.domain.Jeu;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Jeu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JeuRepository extends JpaRepository<Jeu, Long> {

	
	@Query("select count(j) from Jeu j where j.nbDe = :nbDe")
	int countWhere(@Param("nbDe")int nbDe);

	
	@Query("select j from Jeu j where j.nbDe = :nbDe and id = :id")
	Jeu findOneRandom(@Param("nbDe")int nbDe,@Param("id") int id);

	
	@Query("select j.id from Jeu j where j.nbDe = :nbDe")
	List<Long> getidforfirstinlist(Pageable pageable, int nbDe);
}
