export interface Categorie {
  id: number;
  nom: string;
  description: string;
  livres?: any[]; // utile pour savoir si suppression possible
}
