using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    //Aldor nämnde att dessa inte borde vara static i lektionen 16/4? kika på det.
    public class UserHandler
    {
        /*---------------------------------------- POSTS -------------------------------------*/
        public static IResult AddUser(IUserServices userServices, UserDto userdto)
        {
            try
            {
                userServices.AddUser(userdto);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex);
            }
        }

        public static IResult AddChild(IUserServices userServices, int userId, ChildDto childDto) 
        {
            try
            {
                userServices.AddChild(userId, childDto);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.BadRequest(ex);
            }
        }

        /*
        public IResult AddExistingChild(IUserServices userServices, int userId, int childId)
        {
            try
            {
                userServices.AddExistingChild(userId, childId);
            }
            catch
            {
                return Result.BadRequest();
            }

        }
        */

        public static IResult AddAllergy(IUserServices userServices, int childId, AllergyDto allergydto)
        {
            try
            {
                userServices.AddAllergy(childId, allergydto);
                return Results.Ok();
            }

            catch(Exception ex)
            {
                return Results.BadRequest(ex);
            }
        }

        public static IResult AddMeasurement(IUserServices userServices,int childId, MeasurementDto measurementDto)
        {
            try
            {
                userServices.AddMeasurement(childId, measurementDto);
                return Results.Ok();
            }
            catch(Exception ex)
            {
                return Results.BadRequest(ex);
            }
        }

        /*---------------------------------------- GETS -------------------------------------*/

        public static IResult GetUser (IUserServices userServices, int userId)
        {
            try
            {
                var user =  userServices.GetUser(userId);
                return Results.Json(user);
            }
            catch(Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }

        public static IResult GetAllUsers (IUserServices userServices)
        {
            try
            {
                var users = userServices.GetAllUsers();
                return Results.Json(users);
            }
            catch(Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }

        public static IResult GetChildofUser(IUserServices userServices,int userId, int childId)
        {
            try
            {
                var child = userServices.GetChildOfUser(userId, childId);
                return Results.Json(child);
            }
            catch(Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }

        public static IResult GetChildAllergies(IUserServices userServices,int userId, int childId)
        {
            try
            {
                var allergies = userServices.GetChildsAllergies(userId, childId);
                return Results.Json(allergies);
            }
            catch(Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }

        public static IResult GetAllChildrensAllergies(IUserServices userServices, int userId)
        {
            try
            {
                var allergies = userServices.GetAllChildrensAllergies(userId);
                return Results.Json(allergies);
            }
            catch(Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }

        public static async Task<IResult> GetChildDietAi(IUserServices userServices, int userId, int childId, string food)
        {
            try
            {
                var childDiet = await userServices.GetChildDietAi(userId, childId, food);
                return Results.Json(childDiet);
            }
            catch (Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }
    }
}
