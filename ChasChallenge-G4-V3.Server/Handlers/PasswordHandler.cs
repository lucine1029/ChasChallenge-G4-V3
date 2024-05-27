using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    public class PasswordHandler    //Handles methods from PasswordService
    {
        public static async Task<IResult> ForgotPassword(ForgotPasswordViewModel model, ILoginServices loginServices)
        {
            var result= await loginServices.SendForgotPasswordEmailAsync(model.Email);
            if (result)
            {
                return Results.Ok("Password reset link has been sent to your email.");
            }
            return Results.BadRequest("Failed to send password reset link.");
        }

        public static async Task<IResult> Resetpassword(ResetPasswordRequestViewModel model, ILoginServices loginServices)
        {
            try
            {
                var result = await loginServices.ResetPasswordAsync(model);
                if (result)
                {
                    return Results.Ok("Password has been reset sucessfully.");

                }
                return Results.BadRequest("Password reset failed.");
            }
            catch (Exception ex)
            {
                return Results.BadRequest($"An error occured while resetting the password {ex.Message}");
            }
            
        }

        public static async Task<IResult> UpdatePasswordAsync(ChangePasswordDto model, IPasswordService passwordService, string userId)
        {
            
            var result = await passwordService.UpdatePasswordAsync(model, userId);

            return result;
            
            
        }
    }
}
