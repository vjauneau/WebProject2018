import { IDe } from 'app/shared/model//de.model';
import { IUtilisateur } from 'app/shared/model//utilisateur.model';

export interface IJeu {
  id?: number;
  des?: IDe[];
  utilisateur?: IUtilisateur;
}

export const defaultValue: Readonly<IJeu> = {};
