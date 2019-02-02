package fr.istia.perudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "actualPlayer")
    private Integer actualPlayer;    



	@Column(name = "nbPlayer")
    private Integer nbPlayer;
	
	@Column(name = "state")
    private Integer state;
	
	@Column(name = "nbDePari")
    private Integer nbDePari;
	
	@Column(name = "ValeurDePari")
    private Integer ValeurDePari;
	
	@Column(name = "JoueurToPlay")
	private String JoueurToPlay;

    public String getJoueurToPlay() {
		return JoueurToPlay;
	}



	public void setJoueurToPlay(String joueurToPlay) {
		JoueurToPlay = joueurToPlay;
	}



	public Integer getNbDePari() {
		return nbDePari;
	}
    
    

	public void setNbDePari(Integer nbDePari) {
		this.nbDePari = nbDePari;
	}

	public Integer getValeurDePari() {
		return ValeurDePari;
	}

	public void setValeurDePari(Integer valeurDePari) {
		ValeurDePari = valeurDePari;
	}

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    
    public Integer getActualPlayer() {
		return actualPlayer;
	}

	public void setActualPlayer(Integer actualPlayer) {
		this.actualPlayer = actualPlayer;
	}

	public Integer getNbPlayer() {
		return nbPlayer;
	}

	public void setNbPlayer(Integer nbPlayer) {
		this.nbPlayer = nbPlayer;
	}
	
	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

	@Override
	public String toString() {
		return "Game [id=" + id + ", actualPlayer=" + actualPlayer + ", nbPlayer=" + nbPlayer + "]";
	}
    
}
