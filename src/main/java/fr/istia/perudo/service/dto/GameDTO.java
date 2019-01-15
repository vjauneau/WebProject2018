package fr.istia.perudo.service.dto;

import java.util.ArrayList;
import java.util.List;

import fr.istia.perudo.domain.Game;
import fr.istia.perudo.domain.Jeu;
import fr.istia.perudo.domain.Utilisateur;

public class GameDTO {
	
	private Game game;
	private List<Utilisateur> user;
	private Jeu jeu;
	
	public GameDTO() {
		user = new ArrayList<>();
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public List<Utilisateur> getUser() {
		return user;
	}

	public void setUser(List<Utilisateur> user) {
		this.user = user;
	}
	
	public void addUser(Utilisateur user) {
		this.user.add(user);
	}

	public Jeu getJeu() {
		return jeu;
	}

	public void setJeu(Jeu jeu) {
		this.jeu = jeu;
	}
	
	
	

}
