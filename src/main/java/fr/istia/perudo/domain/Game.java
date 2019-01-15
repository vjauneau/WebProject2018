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
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

	@Override
	public String toString() {
		return "Game [id=" + id + ", actualPlayer=" + actualPlayer + ", nbPlayer=" + nbPlayer + "]";
	}
    
}