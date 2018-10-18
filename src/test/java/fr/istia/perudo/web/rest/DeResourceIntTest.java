package fr.istia.perudo.web.rest;

import fr.istia.perudo.PerudoOnlineApp;

import fr.istia.perudo.domain.De;
import fr.istia.perudo.repository.DeRepository;
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
 * Test class for the DeResource REST controller.
 *
 * @see DeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PerudoOnlineApp.class)
public class DeResourceIntTest {

    private static final Integer DEFAULT_VALEUR = 1;
    private static final Integer UPDATED_VALEUR = 2;

    @Autowired
    private DeRepository deRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeMockMvc;

    private De de;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeResource deResource = new DeResource(deRepository);
        this.restDeMockMvc = MockMvcBuilders.standaloneSetup(deResource)
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
    public static De createEntity(EntityManager em) {
        De de = new De()
            .valeur(DEFAULT_VALEUR);
        return de;
    }

    @Before
    public void initTest() {
        de = createEntity(em);
    }

    @Test
    @Transactional
    public void createDe() throws Exception {
        int databaseSizeBeforeCreate = deRepository.findAll().size();

        // Create the De
        restDeMockMvc.perform(post("/api/des")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(de)))
            .andExpect(status().isCreated());

        // Validate the De in the database
        List<De> deList = deRepository.findAll();
        assertThat(deList).hasSize(databaseSizeBeforeCreate + 1);
        De testDe = deList.get(deList.size() - 1);
        assertThat(testDe.getValeur()).isEqualTo(DEFAULT_VALEUR);
    }

    @Test
    @Transactional
    public void createDeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deRepository.findAll().size();

        // Create the De with an existing ID
        de.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeMockMvc.perform(post("/api/des")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(de)))
            .andExpect(status().isBadRequest());

        // Validate the De in the database
        List<De> deList = deRepository.findAll();
        assertThat(deList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDes() throws Exception {
        // Initialize the database
        deRepository.saveAndFlush(de);

        // Get all the deList
        restDeMockMvc.perform(get("/api/des?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(de.getId().intValue())))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR)));
    }
    
    @Test
    @Transactional
    public void getDe() throws Exception {
        // Initialize the database
        deRepository.saveAndFlush(de);

        // Get the de
        restDeMockMvc.perform(get("/api/des/{id}", de.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(de.getId().intValue()))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR));
    }

    @Test
    @Transactional
    public void getNonExistingDe() throws Exception {
        // Get the de
        restDeMockMvc.perform(get("/api/des/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDe() throws Exception {
        // Initialize the database
        deRepository.saveAndFlush(de);

        int databaseSizeBeforeUpdate = deRepository.findAll().size();

        // Update the de
        De updatedDe = deRepository.findById(de.getId()).get();
        // Disconnect from session so that the updates on updatedDe are not directly saved in db
        em.detach(updatedDe);
        updatedDe
            .valeur(UPDATED_VALEUR);

        restDeMockMvc.perform(put("/api/des")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDe)))
            .andExpect(status().isOk());

        // Validate the De in the database
        List<De> deList = deRepository.findAll();
        assertThat(deList).hasSize(databaseSizeBeforeUpdate);
        De testDe = deList.get(deList.size() - 1);
        assertThat(testDe.getValeur()).isEqualTo(UPDATED_VALEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingDe() throws Exception {
        int databaseSizeBeforeUpdate = deRepository.findAll().size();

        // Create the De

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeMockMvc.perform(put("/api/des")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(de)))
            .andExpect(status().isBadRequest());

        // Validate the De in the database
        List<De> deList = deRepository.findAll();
        assertThat(deList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDe() throws Exception {
        // Initialize the database
        deRepository.saveAndFlush(de);

        int databaseSizeBeforeDelete = deRepository.findAll().size();

        // Get the de
        restDeMockMvc.perform(delete("/api/des/{id}", de.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<De> deList = deRepository.findAll();
        assertThat(deList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(De.class);
        De de1 = new De();
        de1.setId(1L);
        De de2 = new De();
        de2.setId(de1.getId());
        assertThat(de1).isEqualTo(de2);
        de2.setId(2L);
        assertThat(de1).isNotEqualTo(de2);
        de1.setId(null);
        assertThat(de1).isNotEqualTo(de2);
    }
}
