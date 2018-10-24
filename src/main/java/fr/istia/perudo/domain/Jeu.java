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

    @Column(name = "nb_de")
    private Integer nbDe;

    @Column(name = "valeur_1")
    private Integer valeur1;

    @Column(name = "valeur_2")
    private Integer valeur2;

    @Column(name = "valeur_3")
    private Integer valeur3;

    @Column(name = "valeur_4")
    private Integer valeur4;

    @Column(name = "valeur_5")
    private Integer valeur5;

    @Column(name = "valeur_6")
    private Integer valeur6;

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

    public Integer getNbDe() {
        return nbDe;
    }

    public Jeu nbDe(Integer nbDe) {
        this.nbDe = nbDe;
        return this;
    }

    public void setNbDe(Integer nbDe) {
        this.nbDe = nbDe;
    }

    public Integer getValeur1() {
        return valeur1;
    }

    public Jeu valeur1(Integer valeur1) {
        this.valeur1 = valeur1;
        return this;
    }

    public void setValeur1(Integer valeur1) {
        this.valeur1 = valeur1;
    }

    public Integer getValeur2() {
        return valeur2;
    }

    public Jeu valeur2(Integer valeur2) {
        this.valeur2 = valeur2;
        return this;
    }

    public void setValeur2(Integer valeur2) {
        this.valeur2 = valeur2;
    }

    public Integer getValeur3() {
        return valeur3;
    }

    public Jeu valeur3(Integer valeur3) {
        this.valeur3 = valeur3;
        return this;
    }

    public void setValeur3(Integer valeur3) {
        this.valeur3 = valeur3;
    }

    public Integer getValeur4() {
        return valeur4;
    }

    public Jeu valeur4(Integer valeur4) {
        this.valeur4 = valeur4;
        return this;
    }

    public void setValeur4(Integer valeur4) {
        this.valeur4 = valeur4;
    }

    public Integer getValeur5() {
        return valeur5;
    }

    public Jeu valeur5(Integer valeur5) {
        this.valeur5 = valeur5;
        return this;
    }

    public void setValeur5(Integer valeur5) {
        this.valeur5 = valeur5;
    }

    public Integer getValeur6() {
        return valeur6;
    }

    public Jeu valeur6(Integer valeur6) {
        this.valeur6 = valeur6;
        return this;
    }

    public void setValeur6(Integer valeur6) {
        this.valeur6 = valeur6;
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
            ", nbDe=" + getNbDe() +
            ", valeur1=" + getValeur1() +
            ", valeur2=" + getValeur2() +
            ", valeur3=" + getValeur3() +
            ", valeur4=" + getValeur4() +
            ", valeur5=" + getValeur5() +
            ", valeur6=" + getValeur6() +
            "}";
    }
}
