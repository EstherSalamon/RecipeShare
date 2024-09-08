using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeShare.Data
{
    public class RecipeRepository
    {
        private readonly string _connection;

        public RecipeRepository(string connection)
        {
            _connection = connection;
        }

        public List<Category> GetCategories(User user)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Categories.Where(c => c.UserID == user.ID).ToList();
        }

        public void AddCategory(Category cat)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Categories.Add(cat);
            context.SaveChanges();
        }

        public List<Recipe> GetRecipes()
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Recipes.Include(r => r.Category).ToList();
        }

        public void AddRecipe(Recipe rep)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"INSERT INTO Recipes VALUES ({rep.Title}, {rep.ImageUrl}, {rep.IngredientsJ}, {rep.DirectionsJ}, {rep.AllowPublic}, {rep.UserID}, {rep.Category.Id})");
        }

        public int TotalRecipesForCategory(int catId)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Recipes.Where(r => r.Category.Id == catId).ToArray().Length;
        }
    }
}
