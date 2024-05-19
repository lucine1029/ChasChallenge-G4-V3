using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    public class LoginHandler
    {
        public static async Task<IResult> UserLoginAsync(HttpContext context, ILoginServices loginService, LoginUserDto loginUser)
        {
            var user = await loginService.UserLoginAsync(loginUser);

            if (!user.Success)
            {
                return Results.BadRequest(user.ErrorMessage);
            }

            bool isAdmin = user.isAdmin;

            var token = loginService.GenerateTokenString(loginUser, isAdmin);

            context.Response.StatusCode = 200;

            return Results.Ok(new { Token = token, UserId = user.UserId });
        }

        public static async Task<IResult> RegisterUserAsync(ILoginServices loginService, IEmailService emailService, UserDto newUser)
        {

            var result = await loginService.RegisterUserAsync(newUser, emailService);

            return result;


        }

        public static async Task<IResult> LogoutAsync(ILoginServices loginService)
        {
            var result = await loginService.LogoutAsync();

            return result;
        }

      
    }
}
