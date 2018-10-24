package fr.istia.perudo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import fr.istia.perudo.domain.De;
import fr.istia.perudo.repository.DeRepository;

public class JeuService {
	
	
	private DeRepository deRepository;
	
	public JeuService()
	{
		
	}
	
	public List<De> GenerateJeu()
	{
		
		List<De> allDe = this.deRepository.findAll();
		List<De> resultSet = new ArrayList<>();
 		int count = allDe.size();
		
		for(int i=0; i< 6 ;i++)
		{
		Random rand = new Random();
		int number = rand.nextInt(count);
		resultSet.add(allDe.get(rand.nextInt(count)));
		}
		
		
		return resultSet;
	}

}
