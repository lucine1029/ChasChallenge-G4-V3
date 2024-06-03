using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChasChallenge_G4_V3.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateChildTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageSource",
                table: "Children",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageSource",
                table: "Children");
        }
    }
}
