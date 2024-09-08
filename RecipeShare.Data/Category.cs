using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeShare.Data
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserID { get; set; }

        [NotMapped]
        public int TotalRecipes { get; set; }
    }
}
