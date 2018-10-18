import { IJeu } from 'app/shared/model//jeu.model';
import { IPlateau } from 'app/shared/model//plateau.model';

export interface IUtilisateur {
  id?: number;
  pseudo?: string;
  points?: number;
  credit?: number;
  couleur?: string;
  jeu?: IJeu;
  plateau?: IPlateau;
}

export const defaultValue: Readonly<IUtilisateur> = {};
