﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserIDtoRecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Recipes");
        }
    }
}
