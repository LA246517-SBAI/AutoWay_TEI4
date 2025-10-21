using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoWay.Migrations
{
    /// <inheritdoc />
    public partial class InitDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Utilisateur",
                columns: table => new
                {
                    UtilisateurID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateNaissance = table.Column<DateOnly>(type: "date", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Utilisateur", x => x.UtilisateurID);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleNom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UtilisateurID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleID);
                    table.ForeignKey(
                        name: "FK_Role_Utilisateur_UtilisateurID",
                        column: x => x.UtilisateurID,
                        principalTable: "Utilisateur",
                        principalColumn: "UtilisateurID");
                });

            migrationBuilder.CreateTable(
                name: "Voiture",
                columns: table => new
                {
                    VoitureID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Marque = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Modele = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrixJournalier = table.Column<double>(type: "float", nullable: false),
                    PlaqueImm = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Actif = table.Column<bool>(type: "bit", nullable: true),
                    UtilisateurID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voiture", x => x.VoitureID);
                    table.ForeignKey(
                        name: "FK_Voiture_Utilisateur_UtilisateurID",
                        column: x => x.UtilisateurID,
                        principalTable: "Utilisateur",
                        principalColumn: "UtilisateurID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Avis",
                columns: table => new
                {
                    AvisID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvisMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvisScore = table.Column<int>(type: "int", nullable: false),
                    AvisDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReservationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avis", x => x.AvisID);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    ReservationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrixFinal = table.Column<double>(type: "float", nullable: false),
                    UtilisateurID = table.Column<int>(type: "int", nullable: false),
                    VoitureID = table.Column<int>(type: "int", nullable: false),
                    AvisID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.ReservationID);
                    table.ForeignKey(
                        name: "FK_Reservations_Avis_AvisID",
                        column: x => x.AvisID,
                        principalTable: "Avis",
                        principalColumn: "AvisID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Reservations_Utilisateur_UtilisateurID",
                        column: x => x.UtilisateurID,
                        principalTable: "Utilisateur",
                        principalColumn: "UtilisateurID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservations_Voiture_VoitureID",
                        column: x => x.VoitureID,
                        principalTable: "Voiture",
                        principalColumn: "VoitureID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Avis_ReservationID",
                table: "Avis",
                column: "ReservationID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_AvisID",
                table: "Reservations",
                column: "AvisID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UtilisateurID",
                table: "Reservations",
                column: "UtilisateurID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_VoitureID",
                table: "Reservations",
                column: "VoitureID");

            migrationBuilder.CreateIndex(
                name: "IX_Role_UtilisateurID",
                table: "Role",
                column: "UtilisateurID");

            migrationBuilder.CreateIndex(
                name: "IX_Voiture_UtilisateurID",
                table: "Voiture",
                column: "UtilisateurID");

            migrationBuilder.AddForeignKey(
                name: "FK_Avis_Reservations_ReservationID",
                table: "Avis",
                column: "ReservationID",
                principalTable: "Reservations",
                principalColumn: "ReservationID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Avis_Reservations_ReservationID",
                table: "Avis");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Avis");

            migrationBuilder.DropTable(
                name: "Voiture");

            migrationBuilder.DropTable(
                name: "Utilisateur");
        }
    }
}
