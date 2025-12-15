namespace BibliothequeAPI.Dtos
{
    public class EmpruntDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LivreId { get; set; }
        public DateTime DateEmprunt { get; set; }
        public DateTime DateRetourPrevue { get; set; }
        public DateTime? DateRetourEffective { get; set; }
        public LivreDto? Livre { get; set; }
    }
}
