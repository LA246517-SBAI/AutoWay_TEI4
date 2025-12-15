export interface EmpruntHistorique {
  id: number;
  titre: string;
  auteur: string;
  dateEmprunt: string;
  dateRetour: string;
  statut: 'rendu' | 'en-attente';
}
