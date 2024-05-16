using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface ILoginServices
    {
        Task<IResult> RegisterUserAsync(UserDto user);
        Task<LoginResultViewModel> UserLoginAsync(LoginUserDto User);
    }
    public class LoginServices : ILoginServices
    {
        private UserManager<User> _userManager; // UserManager is a built-in Identity class that manages the User objects in the program. - Sean

        public LoginServices(UserManager<User> userManager)
        {
            _userManager = userManager;
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

            var isPasswordValid = await _userManager.CheckPasswordAsync(identityUser, loginUser.Password);

            if (!isPasswordValid)
            {
                return new LoginResultViewModel
                {
                    Success = false,
                    ErrorMessage = "Invalid email address or password."

                };
            }

            return new LoginResultViewModel
            {
                Success = true,
                UserId = identityUser.Id
            };

            
        }
    }
}
