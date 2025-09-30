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
        public int UtilisateurID { get; set; }
    }
}
