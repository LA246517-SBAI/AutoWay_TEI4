using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoWay.Migrations
{
    /// <inheritdoc />
    public partial class ajoutdelarelationentrereservationetvoiture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VoitureID",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_VoitureID",
                table: "Reservations",
                column: "VoitureID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Voiture_VoitureID",
                table: "Reservations",
                column: "VoitureID",
                principalTable: "Voiture",
                principalColumn: "VoitureID",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Voiture_VoitureID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_VoitureID",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "VoitureID",
                table: "Reservations");
        }
    }
}
