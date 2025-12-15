import { Livre } from './Livre';

export interface Emprunt {
  id: number;
  userId: number;
  livreId: number;
  dateEmprunt: Date;
  dateRetourPrevue: Date;
  dateRetourEffective?: Date | null;
  livre?: Livre;
}
