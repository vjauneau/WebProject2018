package fr.istia.perudo.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.domain.Jeu;
import fr.istia.perudo.domain.UserJeuGame;
import fr.istia.perudo.domain.Utilisateur;
import fr.istia.perudo.repository.GameRepository;
import fr.istia.perudo.repository.JeuRepository;
import fr.istia.perudo.repository.UserJeuGameRepository;
import fr.istia.perudo.repository.UtilisateurRepository;

public class GameService {
	
	private GameRepository gameRepository;
	private UtilisateurRepository utilisateurRepository;
	private JeuRepository jeuRepository;
	private UserJeuGameRepository userJeuGameRepository;
	private JeuService jeuService;
	
	public GameService(GameRepository GameRepository,UtilisateurRepository UtilisateurRepository, JeuRepository JeuRepository, UserJeuGameRepository UserJeuGameRepository, JeuService JeuService) {
		this.gameRepository = GameRepository;
		this.utilisateurRepository = UtilisateurRepository;
		this.jeuRepository = JeuRepository;
		this.userJeuGameRepository = UserJeuGameRepository;
		this.jeuService = JeuService;
	}
	
	
	public void updateGameState(Long idx) {
		
		Optional<Game> g = this.gameRepository.findById(idx);
		
		if(g.isPresent()) {
			Game game = g.get();
			Integer actualState = game.getState();
			
			switch(actualState) {
			case 0:
				if(game.getActualPlayer() == game.getNbPlayer()) {
					game.setState(1);
					Random rand = new Random();
					List<Utilisateur> users = this.utilisateurRepository.findByGame(game.getId());
					String J2P = users.get(rand.nextInt(game.getNbPlayer())).getPseudo();
					game.setJoueurToPlay(J2P);
					
					this.gameRepository.saveAndFlush(game);
				}
				break;
			default:break;
			}
					
					
			
		}
	}


	public void UpdatePlayerToPlay(Long id) {
		
		Optional<Game> g = this.gameRepository.findById(id);
		if(g.isPresent()) {
			Game game = g.get();
			List<Utilisateur> users = this.utilisateurRepository.findByGame(game.getId());
			System.out.println("Nombre de joueurs : " + users.size());
			String p2p = game.getJoueurToPlay();
			int i=0;
			for(Utilisateur u : users) {
				if(p2p.equals(u.getPseudo())) {
					if(i < users.size()-1) {
						game.setJoueurToPlay(users.get(i+1).getPseudo());
					}
					else {
						game.setJoueurToPlay(users.get(0).getPseudo());
					}
				}
				i++;
				System.out.println("New Joueur to play : " + game.getJoueurToPlay());
			}
			this.gameRepository.saveAndFlush(game);
			
		
		}
		
	}

	private void AddPointToLier(Utilisateur u) {
		u.setPoints(u.getPoints()+1);
		this.utilisateurRepository.saveAndFlush(u);
	}
	
	private void UpdateGameStateAfterLier(Long gameId) {
		Optional<Game> g = this.gameRepository.findById(gameId);
		if(g.isPresent()) {
			Game game = g.get();
			game.setNbDePari(0);
			game.setValeurDePari(0);
			List<Utilisateur> users = this.utilisateurRepository.findByGame(game.getId());
			for(Utilisateur u : users) {
				UserJeuGame ujg = this.userJeuGameRepository.findByUser(u.getPseudo());
				ujg.setJeu(this.jeuService.GetNewJeu(6));
				this.userJeuGameRepository.save(ujg);
			}
			this.gameRepository.saveAndFlush(game);
			this.userJeuGameRepository.flush();
			
			
		}
	}

	public void isLastPlayerALier(Long gameId) {
		Optional<Game> g = this.gameRepository.findById(gameId);
		if(g.isPresent()) {
			Game game = g.get();
			List<Utilisateur> users = this.utilisateurRepository.findByGame(game.getId());
			Integer nbDe = game.getNbDePari();
			Integer valeurDe = game.getValeurDePari();
			List<Jeu> jeux = this.jeuRepository.findByGame(game.getId());
			Integer nbDeJeux = 0;
			for(Jeu j : jeux) {
				if(j.getValeur1() == valeurDe) nbDeJeux ++;
				if(j.getValeur2() == valeurDe) nbDeJeux ++;
				if(j.getValeur3() == valeurDe) nbDeJeux ++;
				if(j.getValeur4() == valeurDe) nbDeJeux ++;
				if(j.getValeur5() == valeurDe) nbDeJeux ++;
				if(j.getValeur6() == valeurDe) nbDeJeux ++;
			}
			
			if(nbDeJeux < nbDe) {
				String p2p = game.getJoueurToPlay();
				int i=0;
				for(Utilisateur u : users) {
					if(p2p.equals(u.getPseudo())) {
						if(i > 0) {
							Utilisateur uLier = users.get(i-1);
							this.AddPointToLier(uLier);
							this.UpdateGameStateAfterLier(gameId);
						}
						else {
							Utilisateur uLier = users.get(users.size()-1);
							this.AddPointToLier(uLier);
							this.UpdateGameStateAfterLier(gameId);
						}
					}
					i++;
				}
				
			}
			else {
				String p2p = game.getJoueurToPlay();
				Utilisateur uLier = this.utilisateurRepository.findByPseudo(p2p);
				this.AddPointToLier(uLier);
				this.UpdateGameStateAfterLier(gameId);
			}
			
		}
	}

}
