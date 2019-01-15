package fr.istia.perudo.web.rest;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.repository.GameRepository;
import fr.istia.perudo.repository.JeuRepository;

/**
 * REST controller for managing Game.
 */
@RestController
@RequestMapping("/api")
public class GameResource {
	
	private final Logger log = LoggerFactory.getLogger(JeuResource.class);

    private static final String ENTITY_NAME = "game";

   private GameRepository gameRepository;

    public GameResource(GameRepository GameRepository) {
    	this.gameRepository = GameRepository;
        
    }
    
    public void CreateGame() {
    	
    }
    
    
    /**
     * GET  /games : get all the games.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of jeus in body
     */
    @GetMapping("/games")
    @Timed
    public List<Game> GetAllGames() {
		return this.gameRepository.findAll();
    	
    }
    
    
    /**
     * GET  /games/pre-join : 
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of jeus in body
     */
    @GetMapping("/games/pre-join")
    @Timed
    public Boolean isGameJoinable(@RequestParam(required = true) Long id) {
    	Optional<Game> game = this.gameRepository.findById(id);
    	if(game.isPresent()) {
    		Game g = game.get();
    	// System.out.println(g);
    	if(g.getActualPlayer() < g.getNbPlayer()) {
    		return true;
    	}
    	else return false;
    	}
    	return false;
    }
    
    /**
     * Post  /games/join : 
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of jeus in body
     */
    @PostMapping("/games/join")
    @Timed
    public void JoinGame(@RequestParam(required = true) Long id) {
    	Optional<Game> game = this.gameRepository.findById(id);
    	if(game.isPresent()) {
    		Game g = game.get();
    		g.setActualPlayer(g.getActualPlayer() +1);
    		this.gameRepository.save(g);
    	}
    	
    }

}
