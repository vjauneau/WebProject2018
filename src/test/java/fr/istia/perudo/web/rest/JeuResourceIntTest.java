package fr.istia.perudo.web.rest;

import fr.istia.perudo.PerudoOnlineApp;

import fr.istia.perudo.domain.Jeu;
import fr.istia.perudo.repository.JeuRepository;
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
 * Test class for the JeuResource REST controller.
 *
 * @see JeuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PerudoOnlineApp.class)
public class JeuResourceIntTest {

    private static final Integer DEFAULT_NB_DE = 1;
    private static final Integer UPDATED_NB_DE = 2;

    private static final Integer DEFAULT_VALEUR_1 = 1;
    private static final Integer UPDATED_VALEUR_1 = 2;

    private static final Integer DEFAULT_VALEUR_2 = 1;
    private static final Integer UPDATED_VALEUR_2 = 2;

    private static final Integer DEFAULT_VALEUR_3 = 1;
    private static final Integer UPDATED_VALEUR_3 = 2;

    private static final Integer DEFAULT_VALEUR_4 = 1;
    private static final Integer UPDATED_VALEUR_4 = 2;

    private static final Integer DEFAULT_VALEUR_5 = 1;
    private static final Integer UPDATED_VALEUR_5 = 2;

    private static final Integer DEFAULT_VALEUR_6 = 1;
    private static final Integer UPDATED_VALEUR_6 = 2;

    @Autowired
    private JeuRepository jeuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJeuMockMvc;

    private Jeu jeu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JeuResource jeuResource = new JeuResource(jeuRepository);
        this.restJeuMockMvc = MockMvcBuilders.standaloneSetup(jeuResource)
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
    public static Jeu createEntity(EntityManager em) {
        Jeu jeu = new Jeu()
            .nbDe(DEFAULT_NB_DE)
            .valeur1(DEFAULT_VALEUR_1)
            .valeur2(DEFAULT_VALEUR_2)
            .valeur3(DEFAULT_VALEUR_3)
            .valeur4(DEFAULT_VALEUR_4)
            .valeur5(DEFAULT_VALEUR_5)
            .valeur6(DEFAULT_VALEUR_6);
        return jeu;
    }

    @Before
    public void initTest() {
        jeu = createEntity(em);
    }

    @Test
    @Transactional
    public void createJeu() throws Exception {
        int databaseSizeBeforeCreate = jeuRepository.findAll().size();

        // Create the Jeu
        restJeuMockMvc.perform(post("/api/jeus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jeu)))
            .andExpect(status().isCreated());

        // Validate the Jeu in the database
        List<Jeu> jeuList = jeuRepository.findAll();
        assertThat(jeuList).hasSize(databaseSizeBeforeCreate + 1);
        Jeu testJeu = jeuList.get(jeuList.size() - 1);
        assertThat(testJeu.getNbDe()).isEqualTo(DEFAULT_NB_DE);
        assertThat(testJeu.getValeur1()).isEqualTo(DEFAULT_VALEUR_1);
        assertThat(testJeu.getValeur2()).isEqualTo(DEFAULT_VALEUR_2);
        assertThat(testJeu.getValeur3()).isEqualTo(DEFAULT_VALEUR_3);
        assertThat(testJeu.getValeur4()).isEqualTo(DEFAULT_VALEUR_4);
        assertThat(testJeu.getValeur5()).isEqualTo(DEFAULT_VALEUR_5);
        assertThat(testJeu.getValeur6()).isEqualTo(DEFAULT_VALEUR_6);
    }

    @Test
    @Transactional
    public void createJeuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jeuRepository.findAll().size();

        // Create the Jeu with an existing ID
        jeu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJeuMockMvc.perform(post("/api/jeus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jeu)))
            .andExpect(status().isBadRequest());

        // Validate the Jeu in the database
        List<Jeu> jeuList = jeuRepository.findAll();
        assertThat(jeuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJeus() throws Exception {
        // Initialize the database
        jeuRepository.saveAndFlush(jeu);

        // Get all the jeuList
        restJeuMockMvc.perform(get("/api/jeus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jeu.getId().intValue())))
            .andExpect(jsonPath("$.[*].nbDe").value(hasItem(DEFAULT_NB_DE)))
            .andExpect(jsonPath("$.[*].valeur1").value(hasItem(DEFAULT_VALEUR_1)))
            .andExpect(jsonPath("$.[*].valeur2").value(hasItem(DEFAULT_VALEUR_2)))
            .andExpect(jsonPath("$.[*].valeur3").value(hasItem(DEFAULT_VALEUR_3)))
            .andExpect(jsonPath("$.[*].valeur4").value(hasItem(DEFAULT_VALEUR_4)))
            .andExpect(jsonPath("$.[*].valeur5").value(hasItem(DEFAULT_VALEUR_5)))
            .andExpect(jsonPath("$.[*].valeur6").value(hasItem(DEFAULT_VALEUR_6)));
    }
    
    @Test
    @Transactional
    public void getJeu() throws Exception {
        // Initialize the database
        jeuRepository.saveAndFlush(jeu);

        // Get the jeu
        restJeuMockMvc.perform(get("/api/jeus/{id}", jeu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jeu.getId().intValue()))
            .andExpect(jsonPath("$.nbDe").value(DEFAULT_NB_DE))
            .andExpect(jsonPath("$.valeur1").value(DEFAULT_VALEUR_1))
            .andExpect(jsonPath("$.valeur2").value(DEFAULT_VALEUR_2))
            .andExpect(jsonPath("$.valeur3").value(DEFAULT_VALEUR_3))
            .andExpect(jsonPath("$.valeur4").value(DEFAULT_VALEUR_4))
            .andExpect(jsonPath("$.valeur5").value(DEFAULT_VALEUR_5))
            .andExpect(jsonPath("$.valeur6").value(DEFAULT_VALEUR_6));
    }

    @Test
    @Transactional
    public void getNonExistingJeu() throws Exception {
        // Get the jeu
        restJeuMockMvc.perform(get("/api/jeus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJeu() throws Exception {
        // Initialize the database
        jeuRepository.saveAndFlush(jeu);

        int databaseSizeBeforeUpdate = jeuRepository.findAll().size();

        // Update the jeu
        Jeu updatedJeu = jeuRepository.findById(jeu.getId()).get();
        // Disconnect from session so that the updates on updatedJeu are not directly saved in db
        em.detach(updatedJeu);
        updatedJeu
            .nbDe(UPDATED_NB_DE)
            .valeur1(UPDATED_VALEUR_1)
            .valeur2(UPDATED_VALEUR_2)
            .valeur3(UPDATED_VALEUR_3)
            .valeur4(UPDATED_VALEUR_4)
            .valeur5(UPDATED_VALEUR_5)
            .valeur6(UPDATED_VALEUR_6);

        restJeuMockMvc.perform(put("/api/jeus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJeu)))
            .andExpect(status().isOk());

        // Validate the Jeu in the database
        List<Jeu> jeuList = jeuRepository.findAll();
        assertThat(jeuList).hasSize(databaseSizeBeforeUpdate);
        Jeu testJeu = jeuList.get(jeuList.size() - 1);
        assertThat(testJeu.getNbDe()).isEqualTo(UPDATED_NB_DE);
        assertThat(testJeu.getValeur1()).isEqualTo(UPDATED_VALEUR_1);
        assertThat(testJeu.getValeur2()).isEqualTo(UPDATED_VALEUR_2);
        assertThat(testJeu.getValeur3()).isEqualTo(UPDATED_VALEUR_3);
        assertThat(testJeu.getValeur4()).isEqualTo(UPDATED_VALEUR_4);
        assertThat(testJeu.getValeur5()).isEqualTo(UPDATED_VALEUR_5);
        assertThat(testJeu.getValeur6()).isEqualTo(UPDATED_VALEUR_6);
    }

    @Test
    @Transactional
    public void updateNonExistingJeu() throws Exception {
        int databaseSizeBeforeUpdate = jeuRepository.findAll().size();

        // Create the Jeu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJeuMockMvc.perform(put("/api/jeus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jeu)))
            .andExpect(status().isBadRequest());

        // Validate the Jeu in the database
        List<Jeu> jeuList = jeuRepository.findAll();
        assertThat(jeuList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJeu() throws Exception {
        // Initialize the database
        jeuRepository.saveAndFlush(jeu);

        int databaseSizeBeforeDelete = jeuRepository.findAll().size();

        // Get the jeu
        restJeuMockMvc.perform(delete("/api/jeus/{id}", jeu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Jeu> jeuList = jeuRepository.findAll();
        assertThat(jeuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jeu.class);
        Jeu jeu1 = new Jeu();
        jeu1.setId(1L);
        Jeu jeu2 = new Jeu();
        jeu2.setId(jeu1.getId());
        assertThat(jeu1).isEqualTo(jeu2);
        jeu2.setId(2L);
        assertThat(jeu1).isNotEqualTo(jeu2);
        jeu1.setId(null);
        assertThat(jeu1).isNotEqualTo(jeu2);
    }
}
