package fr.istia.perudo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.domain.Plateau;
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

}
