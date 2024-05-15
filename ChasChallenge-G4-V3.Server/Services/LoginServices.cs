using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface ILoginServices
    {
        Task<IResult> RegisterUserAsync(UserDto user);
        Task<LoginResultViewModel> UserLoginAsync(LoginUserDto User);

        string GenerateTokenString(LoginUserDto user, bool isAdmin);

        Task<IResult> LogoutAsync();                   
    }
    public class LoginServices : ILoginServices
    {
        private UserManager<User> _userManager; // UserManager is a built-in Identity class that manages the User objects in the program. - Sean
        private IConfiguration _config;
        private SignInManager<User> _signInManager;
        private IHttpContextAccessor _httpContextAccessor;

        public LoginServices(UserManager<User> userManager, IConfiguration config, SignInManager<User> signInManager, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _config = config;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IResult> RegisterUserAsync(UserDto user)
        {

            User existingUser = await _userManager.FindByEmailAsync(user.Email); // Example of UserManager using some built in methods. - Sean

            if (existingUser != null)
            {
                return Results.BadRequest("User already exists in database.");
            }

            var identityUser = new User
            {
                LastName = user.LastName,
                FirstName = user.FirstName,
                UserName = user.Email,
                Email = user.Email,
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password); // Another built in UserManager Method - Sean


            if (result.Succeeded)
            {
                // User created successfully, return Ok
                await _userManager.AddToRoleAsync(identityUser, "User");
                return Results.Ok("User created successfully.");
            }
            else
            {
                // User creation failed, return BadRequest with error message
                return Results.BadRequest("Failed to create user.");
            }

        }

        public async Task<LoginResultViewModel> UserLoginAsync(LoginUserDto loginUser) // There could be a built in Identity/UserManager login method. Will check - Sean
        {
            var identityUser = await _userManager.FindByEmailAsync(loginUser.Email);

            if (identityUser == null)
            {
                return new LoginResultViewModel
                {
                    Success = false,
                    ErrorMessage = "User not found."
                };
             
            }

            var result = await _signInManager.PasswordSignInAsync(identityUser, loginUser.Password, isPersistent: false, lockoutOnFailure: false);
          
            if (!result.Succeeded)
            {
                return new LoginResultViewModel
                {
                    Success = false,
                    ErrorMessage = "Invalid email address or password."
                };
            }
         
            var roles = await _userManager.GetRolesAsync(identityUser);

            bool isAdmin = roles.Contains("Admin");

            return new LoginResultViewModel
            {
                Success = true,
                UserId = identityUser.Id,
                isAdmin = isAdmin
            };           
        }
             
        public string GenerateTokenString(LoginUserDto user, bool isAdmin)
        {
            string role;

            if (isAdmin)
            {
                role = "Admin";
            }
            else
            {
                role = "User";
            }

            IEnumerable<System.Security.Claims.Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, $"{role}"),
            };

           
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));

            var signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            
            var securityToken = new JwtSecurityToken(
                claims:claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer:_config.GetSection("Jwt:Issuer").Value,
                audience:_config.GetSection("Jwt:Audience").Value,
                signingCredentials:signingCred);
          
            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }

        public async Task<IResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();

            return Results.Ok("Logout Successful");
        }

     
    }

}
