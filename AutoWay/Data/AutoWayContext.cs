using AutoWay.AutoWay.Models;
using AutoWay.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoWay.Data
{
    public class AutoWayContext : DbContext
    {
        public AutoWayContext(DbContextOptions<AutoWayContext> options)
            : base(options)
        {
        }

        public DbSet<Utilisateur> Utilisateur { get; set; } = default!;
        public DbSet<Voiture> Voiture { get; set; } = default!;
        public DbSet<Reservation> Reservations { get; set; } = default!;
        public DbSet<Avis> Avis { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // One-to-one entre Reservation et Avis
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Avis)
                .WithOne(a => a.Reservation)
                .HasForeignKey<Avis>(a => a.ReservationID);

            // One-to-many entre Utilisateur et Voiture
            modelBuilder.Entity<Utilisateur>()
                .HasMany(u => u.Voitures)
                .WithOne(v => v.Utilisateur)
                .HasForeignKey(v => v.UtilisateurID);

            // One-to-many entre Utilisateur et Reservation
            modelBuilder.Entity<Utilisateur>()
                .HasMany(u => u.Reservations)
                .WithOne(r => r.Utilisateur)
                .HasForeignKey(r => r.UtilisateurID);

            // One-to-many entre Voiture et Reservation
            modelBuilder.Entity<Voiture>()
                .HasMany(v => v.Reservations)
                .WithOne(r => r.Voiture)
                .HasForeignKey(r => r.VoitureID);
        }
    }
}
