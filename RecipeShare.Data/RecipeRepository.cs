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

        public void AddCategory(Category category)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Categories.Add(category);
            context.SaveChanges();
        }

        public List<Recipe> GetRecipes()
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Recipes.Include(r => r.Category).Where(r => r.AllowPublic == true).ToList();
        }

        public void AddRecipe(Recipe recipe)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"INSERT INTO Recipes VALUES ({recipe.Title}, {recipe.ImageUrl}, {recipe.IngredientsJ}, {recipe.DirectionsJ}, {recipe.AllowPublic}, {recipe.UserID}, {recipe.Category.Id})");
        }

        public int TotalRecipesForCategory(int categoryId)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Recipes.Where(r => r.Category.Id == categoryId).ToArray().Length;
        }

        public List<Recipe> GetByUser(int userId)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Recipes.Where(r => r.UserID == userId).Include(r => r.Category).ToList();
        }
        
        public void UpdatePublic(int recipeId)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"UPDATE Recipes SET AllowPublic = ~AllowPublic WHERE Id = {recipeId}");
        }
    }
}
