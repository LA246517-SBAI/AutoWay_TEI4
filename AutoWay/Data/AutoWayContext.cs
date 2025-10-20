using AutoWay.AutoWay.Models;
using AutoWay.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AutoWay.Data
{
    public class AutoWayContext : DbContext
    {
        public AutoWayContext(DbContextOptions<AutoWayContext> options)
            : base(options)
        {
        }

        public DbSet<Voiture> Voiture { get; set; } = default!;
        public DbSet<Utilisateur> Utilisateur { get; set; } = default!;

		public DbSet<RoleUtilisateur> Role {  get; set; } = default!;

		public DbSet<Reservation> Reservations { get; set; } = default;

		public DbSet<Avis> Avis { get; set; } = default!;

        /*
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Exemple de configuration (à adapter selon ton modèle réel)
			modelBuilder.Entity<Cours>()
				.HasMany(c => c.Etudiants)
				.WithMany(e => e.Cours);

			modelBuilder.Entity<Cours>()
				.HasOne(c => c.Enseignant)
				.WithMany(e => e.Cours)
				.HasForeignKey("EnseignantId");

			modelBuilder.Entity<Enseignant>().HasData(
				new Enseignant { Id = 1, Nom = "Brunquers", Prenom = "Benjamin", Email = "brunquersb@helha.be" },
				new Enseignant { Id = 2, Nom = "Alary", Prenom = "Philippe", Email = "alaryp@helha.be" }
			);
		}
		*/
    }
}
