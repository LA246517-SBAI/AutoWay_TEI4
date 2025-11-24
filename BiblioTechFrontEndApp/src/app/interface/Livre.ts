export interface Livre {
  id: number;
  titre: string;
  auteur: string;
  nbExemplaires: number;
  categorieId: number;
  categorie: {
    id: number;
    nom: string;
  };
}
