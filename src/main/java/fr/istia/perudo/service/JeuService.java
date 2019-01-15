package fr.istia.perudo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.data.domain.PageRequest;

import fr.istia.perudo.domain.De;
import fr.istia.perudo.domain.Jeu;
import fr.istia.perudo.repository.DeRepository;
import fr.istia.perudo.repository.JeuRepository;

public class JeuService {
	
	private static JeuRepository jeuRepository;
	
	
	public JeuService(JeuRepository JeuRepository)
	{
		this.jeuRepository = JeuRepository;
	}
	
	public List<De> GenerateJeu()
	{
		

		return null;
	}
	
	@SuppressWarnings("deprecation")
	public Jeu GetNewJeu(int nbDe)
	{
		int count = this.jeuRepository.countWhere(nbDe);
		Random random = new Random();
		int id = random.nextInt(count);
		List<Long> idfirst = this.jeuRepository.getidforfirstinlist(new PageRequest(0,1), nbDe);
		id += idfirst.get(0);
		Jeu result = this.jeuRepository.findOneRandom(nbDe,(long)id);
		
		return result;
		
	}

}
