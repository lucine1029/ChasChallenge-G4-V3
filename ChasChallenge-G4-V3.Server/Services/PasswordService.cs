using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client;
using System.Web;

namespace ChasChallenge_G4_V3.Server.Services
{
   public interface IPasswordService
    {
        Task<bool> SendForgotPasswordEmailAsync(string email);
        Task<bool>ResetPasswordAsync(ResetPasswordRequestViewModel model);
       
    }
    
    public class PasswordService : IPasswordService
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;

        public PasswordService(UserManager<User> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }
        
        public async Task <bool> SendForgotPasswordEmailAsync(string email) //Sends the reset password link
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
    }
}
