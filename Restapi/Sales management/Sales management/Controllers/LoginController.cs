using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Sales_management.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        IConfiguration _config;
        SalesManagmentContext db;
        //--- dependency injection for configuration ---//
        public LoginController(IConfiguration config, SalesManagmentContext _db)
        {
            _config = config;
            db = _db;
        }
        [AllowAnonymous]
        [HttpGet("{username}/{password}")]
        public IActionResult Login(string username, string password)
        {
            IActionResult response = Unauthorized();


            //--- Authenticate the user ---//
            var _user = AuthenticateUser(username, password);

            //--- validate ---//
            if (_user != null)
            {
                var tokenString = GenerateJWT(username, password);
                response = Ok(new
                {
                    username = _user.Username,
                    UserTypeId = _user.UserTypeId,
                    Token = tokenString
                });
                return response;
            }
            return response;
        }

        private Login AuthenticateUser(string username, string password)
        {
            //Validate the user credentials
            //Retrieve data from the database
            Login user = db.Login.FirstOrDefault(us => us.Username == username && us.Password == password);
            if (user != null)
            {
                return user;
            }
            return null;
        }

        private string GenerateJWT(string username, string password)
        {
            //--- getting security ---//
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            //--- signing credentials ---//
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //--- generate the token ---//
            var token = new JwtSecurityToken(
                    _config["Jwt:Issuer"],
                    _config["Jwt:Issuer"],
                    null,
                    expires: DateTime.Now.AddMinutes(120),
                    signingCredentials: credentials
                    );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

