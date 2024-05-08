using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    public class LoginHandler
    {
        public static async Task<IResult> UserLoginAsync(ILoginServices loginService, LoginUserDto loginUser)
        {
            var result = await loginService.UserLoginAsync(loginUser);

            if (!result.Success)
            {
                return Results.BadRequest(result.ErrorMessage);
            }

            return Results.Json(result.UserId);
        }

        public static async Task<IResult> RegisterUserAsync(ILoginServices loginService, UserDto newUser)
        {

            var result = await loginService.RegisterUserAsync(newUser);

            return result;


        }
    }
}
