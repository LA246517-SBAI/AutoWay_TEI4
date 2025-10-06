using System;

namespace AutoWay.Models
{
    public class Utilisateur
    {
        public int UtilisateurID { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string DateNaissance { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Actif { get; set; }
    }
}
