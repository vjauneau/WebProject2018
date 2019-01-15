export interface IGame {
  id?: number;
  actualPlayer?: number;
  nbPlayer?: number;
}

export const defaultValue: Readonly<IGame> = {};
