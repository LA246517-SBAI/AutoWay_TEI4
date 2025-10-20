using AutoWay.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoWay.AutoWay.Models
{
    public class Reservation
    {
        public int ReservationID { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public double PrixFinal { get; set; }

        public int UtilisateurID { get; set; }

        [ForeignKey("UtilisateurID")]
        public Utilisateur Utilisateur { get; set; }

        public int VoitureID { get; set; }
        [ForeignKey("VoitureID")]
        public Voiture Voiture { get; set; }
    }
}
