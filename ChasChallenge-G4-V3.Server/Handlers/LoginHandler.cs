using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    public class LoginHandler
    {
        public static async Task<IResult> UserLoginAsync(ILoginServices userService, LoginUserDto loginUser)
        {
            var result = await userService.UserLoginAsync(loginUser);

            if (!result.Success)
            {
                return Results.BadRequest(result.ErrorMessage);
            }

            return Results.Ok(result.UserId);
        }

        public static async Task<IResult> RegisterUserAsync(IUserServices userService, UserDto newUser)
        {

            var result = await RegisterUserAsync(userService, newUser);

            return result;


        }
    }
}
