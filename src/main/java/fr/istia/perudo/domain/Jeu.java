package fr.istia.perudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Jeu.
 */
@Entity
@Table(name = "jeu")
public class Jeu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "jeu")
    private Set<De> des = new HashSet<>();
    @OneToOne(mappedBy = "jeu")
    @JsonIgnore
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<De> getDes() {
        return des;
    }

    public Jeu des(Set<De> des) {
        this.des = des;
        return this;
    }

    public Jeu addDe(De de) {
        this.des.add(de);
        de.setJeu(this);
        return this;
    }

    public Jeu removeDe(De de) {
        this.des.remove(de);
        de.setJeu(null);
        return this;
    }

    public void setDes(Set<De> des) {
        this.des = des;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Jeu utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
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
        Jeu jeu = (Jeu) o;
        if (jeu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jeu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Jeu{" +
            "id=" + getId() +
            "}";
    }
}
