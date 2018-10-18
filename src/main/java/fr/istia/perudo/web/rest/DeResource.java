package fr.istia.perudo.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.istia.perudo.domain.De;
import fr.istia.perudo.repository.DeRepository;
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
 * REST controller for managing De.
 */
@RestController
@RequestMapping("/api")
public class DeResource {

    private final Logger log = LoggerFactory.getLogger(DeResource.class);

    private static final String ENTITY_NAME = "de";

    private DeRepository deRepository;

    public DeResource(DeRepository deRepository) {
        this.deRepository = deRepository;
    }

    /**
     * POST  /des : Create a new de.
     *
     * @param de the de to create
     * @return the ResponseEntity with status 201 (Created) and with body the new de, or with status 400 (Bad Request) if the de has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/des")
    @Timed
    public ResponseEntity<De> createDe(@RequestBody De de) throws URISyntaxException {
        log.debug("REST request to save De : {}", de);
        if (de.getId() != null) {
            throw new BadRequestAlertException("A new de cannot already have an ID", ENTITY_NAME, "idexists");
        }
        De result = deRepository.save(de);
        return ResponseEntity.created(new URI("/api/des/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /des : Updates an existing de.
     *
     * @param de the de to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated de,
     * or with status 400 (Bad Request) if the de is not valid,
     * or with status 500 (Internal Server Error) if the de couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/des")
    @Timed
    public ResponseEntity<De> updateDe(@RequestBody De de) throws URISyntaxException {
        log.debug("REST request to update De : {}", de);
        if (de.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        De result = deRepository.save(de);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, de.getId().toString()))
            .body(result);
    }

    /**
     * GET  /des : get all the des.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of des in body
     */
    @GetMapping("/des")
    @Timed
    public List<De> getAllDes() {
        log.debug("REST request to get all Des");
        return deRepository.findAll();
    }

    /**
     * GET  /des/:id : get the "id" de.
     *
     * @param id the id of the de to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the de, or with status 404 (Not Found)
     */
    @GetMapping("/des/{id}")
    @Timed
    public ResponseEntity<De> getDe(@PathVariable Long id) {
        log.debug("REST request to get De : {}", id);
        Optional<De> de = deRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(de);
    }

    /**
     * DELETE  /des/:id : delete the "id" de.
     *
     * @param id the id of the de to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/des/{id}")
    @Timed
    public ResponseEntity<Void> deleteDe(@PathVariable Long id) {
        log.debug("REST request to delete De : {}", id);

        deRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
