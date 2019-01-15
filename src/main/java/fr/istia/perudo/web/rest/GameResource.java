package fr.istia.perudo.web.rest;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.domain.Jeu;
import fr.istia.perudo.domain.UserJeuGame;
import fr.istia.perudo.domain.Utilisateur;
import fr.istia.perudo.repository.GameRepository;
import fr.istia.perudo.repository.JeuRepository;
import fr.istia.perudo.repository.UserJeuGameRepository;
import fr.istia.perudo.repository.UtilisateurRepository;
import fr.istia.perudo.service.JeuService;
import fr.istia.perudo.service.dto.GameDTO;

/**
 * REST controller for managing Game.
 */
@RestController
@RequestMapping("/api")
public class GameResource {
	
	private final Logger log = LoggerFactory.getLogger(JeuResource.class);

    private static final String ENTITY_NAME = "game";

   private GameRepository gameRepository;
   private UtilisateurRepository utilisateurRepository;
   private JeuRepository jeuRepository;
   private UserJeuGameRepository userJeuGameRepository;

   private JeuService jeuService;
   
    public GameResource(GameRepository GameRepository,UtilisateurRepository UtilisateurRepository,JeuRepository JeuRepository,
    		UserJeuGameRepository UserJeuGameRepository ) {
    	this.gameRepository = GameRepository;
    	this.jeuRepository = JeuRepository;
    	this.utilisateurRepository = UtilisateurRepository;
        this.userJeuGameRepository = UserJeuGameRepository;
        this.jeuService = new JeuService(jeuRepository);
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
    	String login = SecurityContextHolder.getContext().getAuthentication().getName();
    	Utilisateur u = this.utilisateurRepository.findByPseudo(login);
    	Optional<Game> game = this.gameRepository.findById(id);
    	if(game.isPresent()) {
    		Game g = game.get();
    		g.setActualPlayer(g.getActualPlayer() +1);
    		
    		
    		UserJeuGame ujg = this.userJeuGameRepository.findByUser(u.getPseudo());
    		//Optional<UserJeuGame> ujg = this.userJeuGameRepository.findById(IDujg);
    		if(ujg == null) {
    			ujg = new UserJeuGame();
    			ujg.setGame(g);
    			ujg.setUser(u);
    			Jeu jeu = this.jeuService.GetNewJeu(6);
    			ujg.setJeu(jeu);
    			this.userJeuGameRepository.saveAndFlush(ujg);
    			this.gameRepository.saveAndFlush(g);
    		}
    		else {
    			ujg.setGame(g);
    			Jeu jeu = this.jeuService.GetNewJeu(6);
    			ujg.setJeu(jeu);
    			this.userJeuGameRepository.saveAndFlush(ujg);
    			this.gameRepository.saveAndFlush(g);
    			
    		}
    	}
    	
    }
    
    /**
     * GET  /games : get all the games.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of jeus in body
     */
    @GetMapping("/games/state")
    @Timed
    public GameDTO GetGameState(@RequestParam(required = true) Long id) {
    	String login = SecurityContextHolder.getContext().getAuthentication().getName();
    	Optional<Game> game = this.gameRepository.findById(id);
    	if(game.isPresent()) {
    		GameDTO gDTO = new GameDTO();
    		Game g = game.get();
    		gDTO.setGame(g);
    		List<Utilisateur> users = this.utilisateurRepository.findByGame(g.getId());
    		gDTO.setUser(users);
    		Jeu jeu = this.jeuRepository.findByUser(login);
    		gDTO.setJeu(jeu);
    		
    		return gDTO;
    	}
    	
    	return null;
    	
    }
    

}
