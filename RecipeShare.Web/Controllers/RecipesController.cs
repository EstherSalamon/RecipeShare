using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using RecipeShare.Data;
using RecipeShare.Web.Models;
using System.Text.Json;

namespace RecipeShare.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly string _connection;

        public RecipesController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("getcategories")]
        public List<Category> GetCategories()
        {
            RecipeRepository repo = new RecipeRepository(_connection);
            UserRepository userRepo = new UserRepository(_connection);
            User user = userRepo.GetUserByEmail(User.Identity.Name);
            List<Category> categories = repo.GetCategories(user);
            foreach(var c in categories)
            {
                c.TotalRecipes = repo.TotalRecipesForCategory(c.Id);
            }
            return categories;
        }

        [HttpPost("addcategory")]
        public void AddCategory(CategoryVM category)
        {
            UserRepository userRepo = new UserRepository(_connection);
            User user = userRepo.GetUserByEmail(User.Identity.Name);
            category.Category.UserID = user.ID;
            Console.WriteLine(category.Category.Name);
            RecipeRepository repo = new RecipeRepository(_connection);
            repo.AddCategory(category.Category);
        }

        [HttpGet("getall")]
        public List<Recipe> GetRecipes()
        {
            RecipeRepository repo = new RecipeRepository(_connection);
            List<Recipe> recipes = repo.GetRecipes();
            foreach (var r in recipes)
            {
                r.Ingredients = JsonSerializer.Deserialize<List<string>>(r.IngredientsJ);
                r.Directions = JsonSerializer.Deserialize<List<string>>(r.DirectionsJ);
            }
            return recipes;
        }

        [HttpPost("addrecipe")]
        [Authorize]
        public void AddRecipe(Recipe recipe)
        {
            RecipeRepository repo = new RecipeRepository(_connection);
            int indexOfComma = recipe.Base64.IndexOf(",");
            string base64 = recipe.Base64.Substring(indexOfComma + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            Guid guid = Guid.NewGuid();
            System.IO.File.WriteAllBytes($"Uploads/{guid}", bytes);

            UserRepository userRepo = new UserRepository(_connection);
            recipe.UserID = userRepo.GetUserByEmail(User.Identity.Name).ID;
            recipe.IngredientsJ = JsonSerializer.Serialize(recipe.Ingredients);
            recipe.DirectionsJ = JsonSerializer.Serialize(recipe.Directions);
            recipe.ImageUrl = guid.ToString();
            repo.AddRecipe(recipe);
        }

        [HttpGet("getimage")]
        public IActionResult GetImage(string imageName)
        {
            Byte[] bytes = System.IO.File.ReadAllBytes($"Uploads/{imageName}");
            return File(bytes, "image/jpg");
        }

        [HttpGet("allbyuser")]
        [Authorize]
        public List<Recipe> GetAllRecipesForUser()
        {
            if(!User.Identity.IsAuthenticated)
            {
                return null;
            }

            UserRepository uRepo = new UserRepository(_connection);
            User user = uRepo.GetUserByEmail(User.Identity.Name);
            RecipeRepository rRepo = new RecipeRepository(_connection);
            List<Recipe> recipes = rRepo.GetByUser(user.ID);
            foreach (var r in recipes)
            {
                r.Ingredients = JsonSerializer.Deserialize<List<string>>(r.IngredientsJ);
                r.Directions = JsonSerializer.Deserialize<List<string>>(r.DirectionsJ);
            }
            return recipes;
        }

        [HttpPost("updatepublic")]
        [Authorize]
        public void UpdateRecipePublicity(UpdateVM vm)
        {
            UserRepository uRepo = new UserRepository(_connection);
            User user = uRepo.GetUserByEmail(User.Identity.Name);
            if(user.ID != vm.UserId)
            {
                return;
            }
            RecipeRepository repo = new RecipeRepository(_connection);
            repo.UpdatePublic(vm.RecipeId);
        }
    }
}
