package fr.istia.perudo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "user_jeu_game")
public class UserJeuGame {
	
	
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;
    
    @ManyToOne
    //@Column(name = "userId")
    private Utilisateur user;

    //@Column(name = "jeuId")
    @ManyToOne
    private Jeu jeu;
    
    
    //@Column(name = "gameId")
    @ManyToOne
    private Game game;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Utilisateur getUser() {
		return user;
	}


	public void setUser(Utilisateur user) {
		this.user = user;
	}


	public Jeu getJeu() {
		return jeu;
	}


	public void setJeu(Jeu jeu) {
		this.jeu = jeu;
	}


	public Game getGame() {
		return game;
	}


	public void setGame(Game game) {
		this.game = game;
	}


	

	
}
