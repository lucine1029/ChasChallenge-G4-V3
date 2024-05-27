using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Web;

namespace ChasChallenge_G4_V3.Server.Services
{
   public interface IPasswordService
    {
        Task<bool> SendForgotPasswordEmailAsync(string email);
        Task<bool>ResetPasswordAsync(ResetPasswordRequestViewModel model);
        Task<IResult> UpdatePasswordAsync(ChangePasswordDto password, string userId);


    }

    public class PasswordService : IPasswordService
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly SignInManager<User> _signInManager;
        //private readonly HttpContext _httpContext;

        public PasswordService(UserManager<User> userManager, IEmailService emailService, SignInManager<User> signInManager/*, HttpContext httpContext*/)
        {
            _userManager = userManager;
            _emailService = emailService;
            _signInManager = signInManager;
            //_httpContext = httpContext;
        }

        public async Task<bool> SendForgotPasswordEmailAsync(string email) //Sends the reset password link
        {
            var user = await _userManager.FindByNameAsync(email);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var passwordResetLink = $"https://localhost:7287/reset-password?Email={email}&Token={HttpUtility.UrlEncode(token)}";

            await _emailService.SendEmailAsync(email, "Reset your pasword", $"Reset your password by <a href='{passwordResetLink}'>clicking here</a>.", true);
            return true;
        }

        public async Task<bool> ResetPasswordAsync(ResetPasswordRequestViewModel model) //Resets the password using the provided token 
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var decodedToken = HttpUtility.UrlDecode(model.Token).Replace(" ", "+");


            var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.Password);
            return result.Succeeded;
        }

        public async Task<IResult> UpdatePasswordAsync(ChangePasswordDto password, string userId)
        {
            User? user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return Results.BadRequest("User not found");
            }

            if (string.IsNullOrEmpty(password.OldPassword) || string.IsNullOrEmpty(password.NewPassword) || string.IsNullOrEmpty(password.ConfirmPassword))
            {
                return Results.BadRequest("Password fields cannot be empty");
            }

            if (password.NewPassword != password.ConfirmPassword)
            {
                return Results.BadRequest("Passwords do not match");
            }

            var passwordVerificationResult = _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password.NewPassword);

            if (passwordVerificationResult == PasswordVerificationResult.Success)
            {
                return Results.BadRequest("Old and new passwords must not match");
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, password.OldPassword, password.NewPassword);

            if (!changePasswordResult.Succeeded)
            {
                return Results.BadRequest("Something went wrong");
            }

            await _signInManager.RefreshSignInAsync(user);

            return Results.Ok("Password change success");

        }


    }
}
