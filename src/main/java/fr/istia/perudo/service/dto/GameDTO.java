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
	private Integer pointsJoueur;
	private Integer joueurToPlay;
	private Integer nbDeParie;
	private Integer valeurDePari;
	


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
	
	public Integer getPointsJoueur() {
		return pointsJoueur;
	}

	public void setPointsJoueur(Integer pointsJoueur) {
		this.pointsJoueur = pointsJoueur;
	}

	public Integer getJoueurToPlay() {
		return joueurToPlay;
	}

	public void setJoueurToPlay(Integer joueurToPlay) {
		this.joueurToPlay = joueurToPlay;
	}

	public Integer getNbDeParie() {
		return nbDeParie;
	}

	public void setNbDeParie(Integer nbDeParie) {
		this.nbDeParie = nbDeParie;
	}

	public Integer getValeurDePari() {
		return valeurDePari;
	}

	public void setValeurDePari(Integer valeurDePari) {
		this.valeurDePari = valeurDePari;
	}
	
	
	

}
