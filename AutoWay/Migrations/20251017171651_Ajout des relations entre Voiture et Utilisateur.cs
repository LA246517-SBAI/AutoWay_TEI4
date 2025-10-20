using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoWay.Migrations
{
    /// <inheritdoc />
    public partial class AjoutdesrelationsentreVoitureetUtilisateur : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Voiture_UtilisateurID",
                table: "Voiture",
                column: "UtilisateurID");

            migrationBuilder.AddForeignKey(
                name: "FK_Voiture_Utilisateur_UtilisateurID",
                table: "Voiture",
                column: "UtilisateurID",
                principalTable: "Utilisateur",
                principalColumn: "UtilisateurID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voiture_Utilisateur_UtilisateurID",
                table: "Voiture");

            migrationBuilder.DropIndex(
                name: "IX_Voiture_UtilisateurID",
                table: "Voiture");
        }
    }
}
