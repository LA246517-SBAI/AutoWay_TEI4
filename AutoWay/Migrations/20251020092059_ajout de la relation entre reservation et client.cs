using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoWay.Migrations
{
    /// <inheritdoc />
    public partial class ajoutdelarelationentrereservationetclient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UtilisateurID",
                table: "Reservations",
                column: "UtilisateurID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Utilisateur_UtilisateurID",
                table: "Reservations",
                column: "UtilisateurID",
                principalTable: "Utilisateur",
                principalColumn: "UtilisateurID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Utilisateur_UtilisateurID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_UtilisateurID",
                table: "Reservations");
        }
    }
}
