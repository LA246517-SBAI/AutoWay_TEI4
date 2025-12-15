export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  annee: number;
  nbExemplaires: number;
  categorieId: number;
  categorie: {
    id: number;
    nom: string;
  };
}
