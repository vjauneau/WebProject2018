import { IUtilisateur } from 'app/shared/model//utilisateur.model';

export interface IPlateau {
  id?: number;
  nom?: string;
  valeur?: number;
  utilisateurs?: IUtilisateur[];
}

export const defaultValue: Readonly<IPlateau> = {};
