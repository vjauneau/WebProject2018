package fr.istia.perudo.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.istia.perudo.domain.Jeu;
import fr.istia.perudo.repository.JeuRepository;
import fr.istia.perudo.web.rest.errors.BadRequestAlertException;
import fr.istia.perudo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Jeu.
 */
@RestController
@RequestMapping("/api")
public class JeuResource {

    private final Logger log = LoggerFactory.getLogger(JeuResource.class);

    private static final String ENTITY_NAME = "jeu";

    private JeuRepository jeuRepository;

    public JeuResource(JeuRepository jeuRepository) {
        this.jeuRepository = jeuRepository;
    }

    /**
     * POST  /jeus : Create a new jeu.
     *
     * @param jeu the jeu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jeu, or with status 400 (Bad Request) if the jeu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/jeus")
    @Timed
    public ResponseEntity<Jeu> createJeu(@RequestBody Jeu jeu) throws URISyntaxException {
        log.debug("REST request to save Jeu : {}", jeu);
        if (jeu.getId() != null) {
            throw new BadRequestAlertException("A new jeu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jeu result = jeuRepository.save(jeu);
        return ResponseEntity.created(new URI("/api/jeus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /jeus : Updates an existing jeu.
     *
     * @param jeu the jeu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jeu,
     * or with status 400 (Bad Request) if the jeu is not valid,
     * or with status 500 (Internal Server Error) if the jeu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/jeus")
    @Timed
    public ResponseEntity<Jeu> updateJeu(@RequestBody Jeu jeu) throws URISyntaxException {
        log.debug("REST request to update Jeu : {}", jeu);
        if (jeu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Jeu result = jeuRepository.save(jeu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jeu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /jeus : get all the jeus.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of jeus in body
     */
    @GetMapping("/jeus")
    @Timed
    public List<Jeu> getAllJeus(@RequestParam(required = false) String filter) {
        if ("utilisateur-is-null".equals(filter)) {
            log.debug("REST request to get all Jeus where utilisateur is null");
            return StreamSupport
                .stream(jeuRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Jeus");
        return jeuRepository.findAll();
    }

    /**
     * GET  /jeus/:id : get the "id" jeu.
     *
     * @param id the id of the jeu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jeu, or with status 404 (Not Found)
     */
    @GetMapping("/jeus/{id}")
    @Timed
    public ResponseEntity<Jeu> getJeu(@PathVariable Long id) {
        log.debug("REST request to get Jeu : {}", id);
        Optional<Jeu> jeu = jeuRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jeu);
    }

    /**
     * DELETE  /jeus/:id : delete the "id" jeu.
     *
     * @param id the id of the jeu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/jeus/{id}")
    @Timed
    public ResponseEntity<Void> deleteJeu(@PathVariable Long id) {
        log.debug("REST request to delete Jeu : {}", id);

        jeuRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
