namespace AutoWay.Models
{
    public class Avis
    {
        /**
         * L'ID de l'avis
         */
        public int AvisID { get; set; }

        /**
         * Le message optionnel de l'avis -- Qu'en pense l'utilisateur
         */
        public string? AvisMessage { get; set; }

        /**
         * Le score de l'avis allant de 1 à 5 (Nul à Excellent)
         */
        public int AvisScore { get; set; }

        /**
         * La date de publication de l'avis
         */
        public DateTime AvisDate { get; set; }   

        /**
         * A quel utilisateur appartient l'avis
         */
        public int UtilisateurID { get; set; }
    }
}
