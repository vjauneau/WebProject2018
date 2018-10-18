package fr.istia.perudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A De.
 */
@Entity
@Table(name = "de")
public class De implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "valeur")
    private Integer valeur;

    @ManyToOne
    @JsonIgnoreProperties("des")
    private Jeu jeu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValeur() {
        return valeur;
    }

    public De valeur(Integer valeur) {
        this.valeur = valeur;
        return this;
    }

    public void setValeur(Integer valeur) {
        this.valeur = valeur;
    }

    public Jeu getJeu() {
        return jeu;
    }

    public De jeu(Jeu jeu) {
        this.jeu = jeu;
        return this;
    }

    public void setJeu(Jeu jeu) {
        this.jeu = jeu;
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
        De de = (De) o;
        if (de.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), de.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "De{" +
            "id=" + getId() +
            ", valeur=" + getValeur() +
            "}";
    }
}
