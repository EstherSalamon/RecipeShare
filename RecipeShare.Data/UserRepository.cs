using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeShare.Data
{
    public class UserRepository
    {
        private readonly string _connection;

        public UserRepository(string connection)
        {
            _connection = connection;
        }

        public void AddUser(User u, string password)
        {
            u.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            using RecipesDataContext context = new RecipesDataContext(_connection);
            context.Users.Add(u);
            context.SaveChanges();
        }

        public User LogIn(string email, string password)
        {
            User user = GetUserByEmail(email);
            if(user is null)
            {
                return null;
            }

            bool verifyPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if(!verifyPassword)
            {
                return null;
            }

            return user;
        }

        public User GetUserByEmail(string email)
        {
            using RecipesDataContext context = new RecipesDataContext(_connection);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
    }
}
