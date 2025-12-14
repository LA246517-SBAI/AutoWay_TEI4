import { Livre } from './Livre';

export interface Emprunt {
  id: number;
  userId: number;
  livreId: number;
  dateEmprunt: string;
  dateRetourPrevue: string;
  dateRetourEffective: string | null;
  livre?: Livre;
  user?: {
    id: number;
    name: string;
    email: string;
    username: string;
  };
}
