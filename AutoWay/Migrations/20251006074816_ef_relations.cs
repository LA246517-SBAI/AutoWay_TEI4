using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoWay.Migrations
{
    /// <inheritdoc />
    public partial class ef_relations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Voiture");
        }
    }
}
