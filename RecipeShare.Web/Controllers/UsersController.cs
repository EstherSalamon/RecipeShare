using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeShare.Data;
using RecipeShare.Web.Models;
using System.Security.Claims;

namespace RecipeShare.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly string _connection;

        public UsersController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("signup")]
        public void SignUp(SignUpVM sivm)
        {
            UserRepository repo = new UserRepository(_connection);
            repo.AddUser(sivm.User, sivm.Password);
        }

        [HttpPost]
        [Route("login")]
        public User LogIn(LogInVM livm)
        {
            UserRepository repo = new UserRepository(_connection);
            User user = repo.LogIn(livm.Email, livm.Password);

            if(user is not null)
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email)
                };

                HttpContext.SignInAsync(new ClaimsPrincipal(
                    new ClaimsIdentity(claims, "cookies", ClaimTypes.Email, "role"))).Wait();

                return user;
                    
            }

            return null;
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetUser()
        {
            if(!User.Identity.IsAuthenticated)
            {
                return null;
            }

            UserRepository repo = new UserRepository(_connection);
            //System.Threading.Thread.Sleep(3000);
            return repo.GetUserByEmail(User.Identity.Name);
        }

        [HttpGet]
        [Route("logout")]
        public void LogOut()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpGet("emailexists")]
        public bool EmailExists(string email)
        {
            UserRepository repo = new UserRepository(_connection);
            return repo.EmailExists(email);
        }
    }
}
