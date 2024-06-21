using RecipeShare.Data;

namespace RecipeShare.Web.Models
{
    public class RecipeVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public List<string> IngredientsL { get; set; }
        public List<string> DirectionsL { get; set; }
        public bool AllowPublic { get; set; }
    }
}
