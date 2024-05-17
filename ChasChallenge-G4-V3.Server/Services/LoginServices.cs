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

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface ILoginServices
    {
        Task<IResult> RegisterUserAsync(UserDto usere); //---Jing added string scheme
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
        private readonly IUrlHelperFactory _urlHelperFactory;  ////----Jing
        private readonly IEmailServices _emailServices; //----Jing

        public LoginServices(UserManager<User> userManager, IConfiguration config, SignInManager<User> signInManager, IHttpContextAccessor httpContextAccessor,
            ILogger<LoginServices> logger, IUrlHelperFactory urlHelperFactory,
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

        public async Task<IResult> RegisterUserAsync(UserDto user) //Jing added string scheme
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
                // User created successfully, generate email confirmation token           ----Jing
                /*var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);

                // Generate confirmation link  ----Jing

                var confirmationLink = Uri.EscapeDataString(emailConfirmationToken);
                    Action("ConfirmEmail", "Account",
                    new { userId = identityUser.Id, token = emailConfirmationToken }, Request.Scheme);

                _logger.LogWarning(confirmationLink);  //Log the confirmation link*/


                // User created successfully, return Ok
                await _userManager.AddToRoleAsync(identityUser, "User");
                await _emailServices.SendEmailAsync(identityUser.Email, "Welcome", "Great, you are registed!");

                //return Results.Ok("User created successfully."); ----Sean, I changed it , see below

                //var confirmationLink = $"{scheme}://localhost:5173/confirmEmail?userId={identityUser.Id}&token={emailConfirmationToken}";



                return Results.Ok("User registered. Please check your email to confirm your account.");  //---Jing







                //Send email to the registed user ---Jing
                /*await _emailServices.SendEmailAsync(MailData mailData);

                //return success message ----Jing
                return Results.Ok("User registered. Please check your email to confirm your account.");  //---Jing

                Generate confirmation link using UrlHelper ----Jing
               var urlHelper = _urlHelperFactory.GetUrlHelper(ViewContext);
               var confirmationLink = urlHelper.Action("ConfirmEmail", "Account",
                   new { userId = identityUser.Id, token = emailConfirmationToken},HttpContext.Request.Scheme);
               _logger.LogWarning(confirmationLink);  //Log the confirmation link

                //Create the redirect url that need to have an action to send in the email  ----Jing
                //create an object 
                /*var callbackUrl = Url.Action(
                "ConfirmEmail",
                    "Account",
                    new { userId = user.Id, code = Token },
                    protocol: HttpContext.Request.Scheme);
                await _emailSender.SendEmailAsync(model.Email, "Confirm your email",
                                    $"Please confirm your account by <a href='{callbackUrl}'>clicking here</a>.");*/
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
