package fr.istia.perudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Plateau.
 */
@Entity
@Table(name = "plateau")
public class Plateau implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "valeur")
    private Integer valeur;

    @OneToMany(mappedBy = "plateau")
    private Set<Utilisateur> utilisateurs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Plateau nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getValeur() {
        return valeur;
    }

    public Plateau valeur(Integer valeur) {
        this.valeur = valeur;
        return this;
    }

    public void setValeur(Integer valeur) {
        this.valeur = valeur;
    }

    public Set<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public Plateau utilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
        return this;
    }

    public Plateau addUtilisateur(Utilisateur utilisateur) {
        this.utilisateurs.add(utilisateur);
        utilisateur.setPlateau(this);
        return this;
    }

    public Plateau removeUtilisateur(Utilisateur utilisateur) {
        this.utilisateurs.remove(utilisateur);
        utilisateur.setPlateau(null);
        return this;
    }

    public void setUtilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
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
        Plateau plateau = (Plateau) o;
        if (plateau.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plateau.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plateau{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", valeur=" + getValeur() +
            "}";
    }
}
