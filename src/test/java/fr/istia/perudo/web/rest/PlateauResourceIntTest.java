package fr.istia.perudo.web.rest;

import fr.istia.perudo.PerudoOnlineApp;

import fr.istia.perudo.domain.Plateau;
import fr.istia.perudo.repository.PlateauRepository;
import fr.istia.perudo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static fr.istia.perudo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlateauResource REST controller.
 *
 * @see PlateauResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PerudoOnlineApp.class)
public class PlateauResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_VALEUR = 1;
    private static final Integer UPDATED_VALEUR = 2;

    @Autowired
    private PlateauRepository plateauRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlateauMockMvc;

    private Plateau plateau;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlateauResource plateauResource = new PlateauResource(plateauRepository);
        this.restPlateauMockMvc = MockMvcBuilders.standaloneSetup(plateauResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plateau createEntity(EntityManager em) {
        Plateau plateau = new Plateau()
            .nom(DEFAULT_NOM)
            .valeur(DEFAULT_VALEUR);
        return plateau;
    }

    @Before
    public void initTest() {
        plateau = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlateau() throws Exception {
        int databaseSizeBeforeCreate = plateauRepository.findAll().size();

        // Create the Plateau
        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isCreated());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeCreate + 1);
        Plateau testPlateau = plateauList.get(plateauList.size() - 1);
        assertThat(testPlateau.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPlateau.getValeur()).isEqualTo(DEFAULT_VALEUR);
    }

    @Test
    @Transactional
    public void createPlateauWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plateauRepository.findAll().size();

        // Create the Plateau with an existing ID
        plateau.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlateauMockMvc.perform(post("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlateaus() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get all the plateauList
        restPlateauMockMvc.perform(get("/api/plateaus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plateau.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR)));
    }
    
    @Test
    @Transactional
    public void getPlateau() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        // Get the plateau
        restPlateauMockMvc.perform(get("/api/plateaus/{id}", plateau.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plateau.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR));
    }

    @Test
    @Transactional
    public void getNonExistingPlateau() throws Exception {
        // Get the plateau
        restPlateauMockMvc.perform(get("/api/plateaus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlateau() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        int databaseSizeBeforeUpdate = plateauRepository.findAll().size();

        // Update the plateau
        Plateau updatedPlateau = plateauRepository.findById(plateau.getId()).get();
        // Disconnect from session so that the updates on updatedPlateau are not directly saved in db
        em.detach(updatedPlateau);
        updatedPlateau
            .nom(UPDATED_NOM)
            .valeur(UPDATED_VALEUR);

        restPlateauMockMvc.perform(put("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlateau)))
            .andExpect(status().isOk());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeUpdate);
        Plateau testPlateau = plateauList.get(plateauList.size() - 1);
        assertThat(testPlateau.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPlateau.getValeur()).isEqualTo(UPDATED_VALEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingPlateau() throws Exception {
        int databaseSizeBeforeUpdate = plateauRepository.findAll().size();

        // Create the Plateau

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlateauMockMvc.perform(put("/api/plateaus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateau)))
            .andExpect(status().isBadRequest());

        // Validate the Plateau in the database
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlateau() throws Exception {
        // Initialize the database
        plateauRepository.saveAndFlush(plateau);

        int databaseSizeBeforeDelete = plateauRepository.findAll().size();

        // Get the plateau
        restPlateauMockMvc.perform(delete("/api/plateaus/{id}", plateau.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plateau> plateauList = plateauRepository.findAll();
        assertThat(plateauList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plateau.class);
        Plateau plateau1 = new Plateau();
        plateau1.setId(1L);
        Plateau plateau2 = new Plateau();
        plateau2.setId(plateau1.getId());
        assertThat(plateau1).isEqualTo(plateau2);
        plateau2.setId(2L);
        assertThat(plateau1).isNotEqualTo(plateau2);
        plateau1.setId(null);
        assertThat(plateau1).isNotEqualTo(plateau2);
    }
}
