namespace BibliothequeAPI.Dtos
{
    public class LivreDto
    {
        public int Id { get; set; }
        public string Titre { get; set; } = string.Empty;
        public string Auteur { get; set; } = string.Empty;
        public int Annee { get; set; }
        public int NbExemplaires { get; set; }
        public int CategorieId { get; set; }
        public CategorieDto? Categorie { get; set; }
    }
}
