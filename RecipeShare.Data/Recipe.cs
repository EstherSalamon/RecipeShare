using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RecipeShare.Data
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        [JsonIgnore]
        public string IngredientsJ { get; set; }
        [JsonIgnore]
        public string DirectionsJ { get; set; }
        public bool AllowPublic { get; set; }
        public int UserID { get; set; }

        [NotMapped]
        public List<string> Directions { get; set; }
        [NotMapped]
        public List<string> Ingredients { get; set; }
        [NotMapped]
        public string Base64 { get; set; }
    }
}
