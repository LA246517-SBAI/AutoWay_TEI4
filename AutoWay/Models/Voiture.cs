using AutoWay.AutoWay.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoWay.Models
{
    public class Voiture
    {

        public int VoitureID { get; set; }
        public string Marque { get; set; }
        public string Modele { get; set; }
        public double PrixJournalier { get; set; }
        public string PlaqueImm { get; set; }
        public bool? Actif { get; set; }

        // Clé étrangère vers Utilisateur
        public int UtilisateurID { get; set; }

        // Propriété de navigation
        [ForeignKey("UtilisateurID")]
        public Utilisateur Utilisateur { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
