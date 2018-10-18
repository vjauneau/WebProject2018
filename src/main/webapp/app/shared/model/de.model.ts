import { IJeu } from 'app/shared/model//jeu.model';

export interface IDe {
  id?: number;
  valeur?: number;
  jeu?: IJeu;
}

export const defaultValue: Readonly<IDe> = {};
