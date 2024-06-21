using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeShare.Data
{
    public class Repository
    {
        private readonly string _connection;

        public Repository(string connection)
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
            return context.Recipes.ToList();
        }

        public void AddRecipe(Recipe rep)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Recipes.Add(rep);
            context.Database.ExecuteSqlInterpolated($"UPDATE Categories SET TotalRecipes = (TotalRecipes + 1) WHERE Id = {rep.Category.Id}");
            context.SaveChanges();
        }
    }
}
