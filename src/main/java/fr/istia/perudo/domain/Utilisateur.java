package fr.istia.perudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "pseudo")
    private String pseudo;

    @Column(name = "points")
    private Integer points;

    @Column(name = "credit")
    private Integer credit;

    @Column(name = "couleur")
    private String couleur;

    @OneToOne    @JoinColumn(unique = true)
    private Jeu jeu;

    @ManyToOne
    @JsonIgnoreProperties("utilisateurs")
    private Plateau plateau;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public Utilisateur pseudo(String pseudo) {
        this.pseudo = pseudo;
        return this;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public Integer getPoints() {
        return points;
    }

    public Utilisateur points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getCredit() {
        return credit;
    }

    public Utilisateur credit(Integer credit) {
        this.credit = credit;
        return this;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public String getCouleur() {
        return couleur;
    }

    public Utilisateur couleur(String couleur) {
        this.couleur = couleur;
        return this;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public Jeu getJeu() {
        return jeu;
    }

    public Utilisateur jeu(Jeu jeu) {
        this.jeu = jeu;
        return this;
    }

    public void setJeu(Jeu jeu) {
        this.jeu = jeu;
    }

    public Plateau getPlateau() {
        return plateau;
    }

    public Utilisateur plateau(Plateau plateau) {
        this.plateau = plateau;
        return this;
    }

    public void setPlateau(Plateau plateau) {
        this.plateau = plateau;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Utilisateur utilisateur = (Utilisateur) o;
        if (utilisateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), utilisateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", pseudo='" + getPseudo() + "'" +
            ", points=" + getPoints() +
            ", credit=" + getCredit() +
            ", couleur='" + getCouleur() + "'" +
            "}";
    }
}
