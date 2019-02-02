package fr.istia.perudo.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.domain.Utilisateur;
import fr.istia.perudo.repository.GameRepository;
import fr.istia.perudo.repository.UtilisateurRepository;

public class GameService {
	
	private GameRepository gameRepository;
	private UtilisateurRepository utilisateurRepository;
	
	public GameService(GameRepository GameRepository,UtilisateurRepository UtilisateurRepository) {
		this.gameRepository = GameRepository;
		this.utilisateurRepository = UtilisateurRepository;
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

}
