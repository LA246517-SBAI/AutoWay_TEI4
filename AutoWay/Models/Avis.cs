using System.ComponentModel.DataAnnotations.Schema;
using AutoWay.AutoWay.Models;

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
         * A quelle réservation cet avis est-il lié
         */
        [ForeignKey("ReservationID")]
        public Reservation Reservation { get; set; }
    }
}
