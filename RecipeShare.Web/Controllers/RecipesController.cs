using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IWebHostEnvironment _webEnv;

        public RecipesController(IConfiguration config, IWebHostEnvironment webEnv)
        {
            _connection = config.GetConnectionString("ConStr");
            _webEnv = webEnv;
        }

        [HttpGet]
        [Route("getcategories")]
        public List<Category> GetCategories()
        {
            Repository repo = new Repository(_connection);
            UserRepository userRepo = new UserRepository(_connection);
            User user = userRepo.GetUserByEmail(User.Identity.Name);
            return repo.GetCategories(user);
        }

        [HttpPost]
        [Route("addcategory")]
        public void AddCategory(CategoryVM cat)
        {
            UserRepository userRepo = new UserRepository(_connection);
            User user = userRepo.GetUserByEmail(User.Identity.Name);
            cat.Category.UserID = user.ID;
            Repository repo = new Repository(_connection);
            repo.AddCategory(cat.Category);
        }

        [HttpGet]
        [Route("getall")]
        public List<RecipeVM> GetRecipes()
        {
            Repository repo = new Repository(_connection);
            List<RecipeVM> recipesList = ConvertFromDatabase(repo.GetRecipes());
            return recipesList;
        }

        [HttpPost]
        [Route("addrecipe")]
        public void AddRecipe(RecipeVM rep)
        {
            Repository repo = new Repository(_connection);

            int indexOfComma = rep.ImageUrl.IndexOf(",");
            string base64 = rep.ImageUrl.Substring(indexOfComma + 1);
            byte[] bytes = Convert.FromBase64String(base64);
            Guid guid = new Guid();
            System.IO.File.WriteAllBytes(guid.ToString(), bytes);
            string path = Path.Combine(_webEnv.WebRootPath, "uploads", guid.ToString());

            Recipe converted = new Recipe
            {
                Id = rep.Id,
                Title = rep.Title,
                ImageUrl = path,
                Category = rep.Category,
                IngredientsJ = JsonSerializer.Serialize(rep.IngredientsL),
                DirectionsJ = JsonSerializer.Serialize(rep.DirectionsL),
                AllowPublic = rep.AllowPublic
            };
            repo.AddRecipe(converted);
        }

        private List<RecipeVM> ConvertFromDatabase(List<Recipe> recipes)
        {
            List<RecipeVM> recipesList = new List<RecipeVM>();
            foreach (Recipe rep in recipes)
            {
                RecipeVM vm = new RecipeVM
                {
                    Id = rep.Id,
                    Title = rep.Title,
                    ImageUrl = rep.ImageUrl,
                    Category = rep.Category,
                    IngredientsL = JsonSerializer.Deserialize<string[]>(rep.IngredientsJ).ToList(),
                    DirectionsL = JsonSerializer.Deserialize<string[]>(rep.DirectionsJ).ToList(),
                    AllowPublic = rep.AllowPublic
                };
                recipesList.Add(vm);
            }
            return recipesList;
        }
    }
}
