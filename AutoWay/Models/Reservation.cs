namespace AutoWay.AutoWay.Models
{
    public class Reservation
    {
        public int ReservationID { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public double PrixFinal { get; set; }

        public int UtilisateurID { get; set; }
    }
}
