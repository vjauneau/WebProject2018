package fr.istia.perudo.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.istia.perudo.domain.Plateau;
import fr.istia.perudo.repository.PlateauRepository;
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

/**
 * REST controller for managing Plateau.
 */
@RestController
@RequestMapping("/api")
public class PlateauResource {

    private final Logger log = LoggerFactory.getLogger(PlateauResource.class);

    private static final String ENTITY_NAME = "plateau";

    private PlateauRepository plateauRepository;

    public PlateauResource(PlateauRepository plateauRepository) {
        this.plateauRepository = plateauRepository;
    }

    /**
     * POST  /plateaus : Create a new plateau.
     *
     * @param plateau the plateau to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plateau, or with status 400 (Bad Request) if the plateau has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plateaus")
    @Timed
    public ResponseEntity<Plateau> createPlateau(@RequestBody Plateau plateau) throws URISyntaxException {
        log.debug("REST request to save Plateau : {}", plateau);
        if (plateau.getId() != null) {
            throw new BadRequestAlertException("A new plateau cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plateau result = plateauRepository.save(plateau);
        return ResponseEntity.created(new URI("/api/plateaus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plateaus : Updates an existing plateau.
     *
     * @param plateau the plateau to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plateau,
     * or with status 400 (Bad Request) if the plateau is not valid,
     * or with status 500 (Internal Server Error) if the plateau couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plateaus")
    @Timed
    public ResponseEntity<Plateau> updatePlateau(@RequestBody Plateau plateau) throws URISyntaxException {
        log.debug("REST request to update Plateau : {}", plateau);
        if (plateau.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plateau result = plateauRepository.save(plateau);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plateau.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plateaus : get all the plateaus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of plateaus in body
     */
    @GetMapping("/plateaus")
    @Timed
    public List<Plateau> getAllPlateaus() {
        log.debug("REST request to get all Plateaus");
        return plateauRepository.findAll();
    }

    /**
     * GET  /plateaus/:id : get the "id" plateau.
     *
     * @param id the id of the plateau to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plateau, or with status 404 (Not Found)
     */
    @GetMapping("/plateaus/{id}")
    @Timed
    public ResponseEntity<Plateau> getPlateau(@PathVariable Long id) {
        log.debug("REST request to get Plateau : {}", id);
        Optional<Plateau> plateau = plateauRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plateau);
    }

    /**
     * DELETE  /plateaus/:id : delete the "id" plateau.
     *
     * @param id the id of the plateau to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plateaus/{id}")
    @Timed
    public ResponseEntity<Void> deletePlateau(@PathVariable Long id) {
        log.debug("REST request to delete Plateau : {}", id);

        plateauRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
