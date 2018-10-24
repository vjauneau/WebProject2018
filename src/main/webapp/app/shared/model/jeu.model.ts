import { IDe } from 'app/shared/model//de.model';
import { IUtilisateur } from 'app/shared/model//utilisateur.model';

export interface IJeu {
  id?: number;
  nbDe?: number;
  valeur1?: number;
  valeur2?: number;
  valeur3?: number;
  valeur4?: number;
  valeur5?: number;
  valeur6?: number;
  des?: IDe[];
  utilisateur?: IUtilisateur;
}

export const defaultValue: Readonly<IJeu> = {};
