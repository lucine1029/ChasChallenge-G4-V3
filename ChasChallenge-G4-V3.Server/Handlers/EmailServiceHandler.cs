using ChasChallenge_G4_V3.Server.Models;
using Microsoft.AspNetCore.Identity;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    public class EmailServiceHandler
    {
        public static async Task<IResult>ConfirmEmailAsync(string userId, string token, UserManager<User> userManager)
        {
            var user = await userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return Results.BadRequest("InvalidCastException user ID.");
            }

            var result = await userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Results.Ok("Email confirmed sucessfully");
            }
            return Results.BadRequest("Email confirmation failed");
        }
    }
}
