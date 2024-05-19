using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity.UI.Services;
using Newtonsoft.Json.Linq;
using System;
using Microsoft.AspNetCore.Mvc.Routing;
using static System.Net.WebRequestMethods;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Net.NetworkInformation;
using Org.BouncyCastle.Asn1.Pkcs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Encodings.Web;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface ILoginServices
    {
        Task<IResult> RegisterUserAsync(UserDto usere);
        Task<IResult> ConfirmEmailAsync(string userId, string token); //---Jing
        Task<LoginResultViewModel> UserLoginAsync(LoginUserDto User);
        string GenerateTokenString(LoginUserDto user, bool isAdmin);
        Task<IResult> LogoutAsync();
        public Task<bool> IsUserLoggedIn();
    }
    public class LoginServices : ILoginServices
    {
        private UserManager<User> _userManager; // UserManager is a built-in Identity class that manages the User objects in the program. - Sean
        private IConfiguration _config;
        private SignInManager<User> _signInManager;
        private IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<LoginServices> _logger;  //----Jing
        private readonly IUrlHelperFactory _urlHelperFactory;  //---Jing
        private readonly IEmailServices _emailServices; //----Jing

        public LoginServices(
            UserManager<User> userManager, 
            IConfiguration config, 
            SignInManager<User> signInManager, 
            IHttpContextAccessor httpContextAccessor,
            ILogger<LoginServices> logger, 
            IUrlHelperFactory urlHelperFactory,
            IEmailServices emailServices) //Jing added ILogger<LoginServices> logger, IUrlHelperFactory urlHelperFactory, IEmailServices emailServices
        {
            _userManager = userManager;
            _config = config;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;   //--Jing
            _urlHelperFactory = urlHelperFactory; //--Jing
            _emailServices = emailServices; //--Jing
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
                await _userManager.AddToRoleAsync(identityUser, "User"); //---- Sean

                // User created successfully, generate email confirmation token           ----Jing
                var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                //_userManager.GeneratePasswordResetTokenAsync





               //emailConfirmationToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(emailConfirmationToken));

               var context = _httpContextAccessor.HttpContext;
                var scheme = context.Request.Scheme;
                var urlHelper = _urlHelperFactory.GetUrlHelper(new ActionContext(context, context.GetRouteData(), new Microsoft.AspNetCore.Mvc.Abstractions.ActionDescriptor()));

                // Generate confirmation link  ----Jing
                var confirmatonLink = urlHelper.Action(
                    nameof(ConfirmEmailAsync),  //endpoint
                    "LoginHandler",  //controller name
                    new {userId = identityUser.Id, token = emailConfirmationToken}, scheme);

                //_logger.LogInformation("User registered. Please check your email to confirm your account.");

                await _emailServices.SendEmailAsync(identityUser.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{confirmatonLink}'>clicking here</a>.");

                return Results.Ok("User registered. Please check your email to confirm your account.");  

                // User created successfully, return Ok
                //Send email to users email with message(please click here to confirm) and confirmation link   ----Jing

                //when the user click on the link, the variable EmailConfirmed should change from fale to true ----Jing

                //then when the user login, need to check if the email confirmed or not, if yes user can login , if no then ErrorMessage = "Not allowed to login." ----Jing

            }
            else
            {
                // User creation failed, return BadRequest with error message
                return Results.BadRequest("Failed to create user.");
            }

        }
        public async Task<IResult> ConfirmEmailAsync(string userId, string token)  //--Jing
        {
            if (userId == null || token == null)
            {
                return Results.BadRequest("Invalid token");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Results.BadRequest("User not found");
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                //user.EmailConfirmed = true;
                await _emailServices.SendEmailAsync(user.Email, "Email Confirmed", "Thank you for confirming your email.");
                return Results.Ok("Email confirmed successfully.");
            }

            return Results.BadRequest("Email confirmation failed");
        }

        public async Task<LoginResultViewModel> UserLoginAsync(LoginUserDto loginUser) // There could be a built in Identity/UserManager login method. Will check - Sean
        {
            var identityUser = await _userManager.FindByEmailAsync(loginUser.Email);

            /*if (identityUser != null)
            {
                return redirectToLocal(returnUserUrl)
            }*/

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

            /*if (result.IsNotAllowed )   //-----Jing
            {
                return new LoginResultViewModel
                {
                    Success = false,
                    ErrorMessage = "Not allowed to login."
                };
            }
            else   //-----Jing
            {
                return new LoginResultViewModel
                {
                    Success = false,
                    ErrorMessage = "Invalid credentials."
                };
            }*/
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
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }

        public async Task<IResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();

            return Results.Ok("Logout Successful");
        }

        public async Task<bool> IsUserLoggedIn()
        {
            HttpContext httpContext = _httpContextAccessor.HttpContext;

            return httpContext.User.Identity.IsAuthenticated;

        }

    }

}
