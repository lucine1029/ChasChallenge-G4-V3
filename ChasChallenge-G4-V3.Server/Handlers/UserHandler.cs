﻿using ChasChallenge_G4_V3.Server.CustomExceptions;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Collections.Generic;

namespace ChasChallenge_G4_V3.Server.Handlers
{
    //Aldor nämnde att dessa inte borde vara static i lektionen 16/4? kika på det.
    public class UserHandler
    {
        /*---------------------------------------- POST -------------------------------------*/

        public static IResult AddChild(IUserServices userServices, string userId, ChildDto childDto)
        {
            try
            {
                userServices.AddChild(userId, childDto);
                return Results.Ok();
            }
            catch (InvalidDataException ex)
            {
                return Results.BadRequest(new { message = ex.Message});
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message});
            }
            catch (DuplicateNameException ex)
            {
                return Results.BadRequest(new { message = ex.Message });
            }
            catch(DbUpdateException ex)
            {
                return Results.BadRequest(new { message = ex.Message});
            }
        }

        public static IResult AddAllergy(IUserServices userServices, string userId, int childId, AllergyDto allergydto)
        {
            try
            {
                userServices.AddAllergy(userId, childId, allergydto);
                return Results.Ok();
            }
            catch (InvalidDataException ex)
            {
                return Results.BadRequest(new { message = ex.Message});
            }
            catch(ChildNotFoundException ex)
            {
                return Results.NotFound(new {message = ex.Message});
            }
            catch(DuplicateNameException ex)
            {
                return Results.BadRequest(new {message = ex.Message});
            }
            catch(DbUpdateException ex)
            {
                return Results.BadRequest(new {messsage = ex.Message});
            }
        }

        public static IResult AddMeasurement(IUserServices userServices,string userId, int childId, MeasurementDto measurementDto)
        {
            try
            {
                userServices.AddMeasurement(userId, childId, measurementDto);
                return Results.Ok();
            }
            catch (InvalidDataException ex)
            {
                return Results.BadRequest(new { message = ex.Message});
            }
            catch(ChildNotFoundException ex)
            {
                return Results.NotFound(new {messsage = ex.Message});
            }
            catch(DuplicateNameException ex)
            {
                return Results.BadRequest(new { message = ex.Message});
            }
            catch(DbUpdateException ex)
            {
                return Results.BadRequest(new { message = ex.Message });
            }
        }

        /*---------------------------------------- GETS -------------------------------------*/

        public static IResult GetUser(IUserServices userServices, string userId)
        {
            try
            {
                var user = userServices.GetUser(userId);
                return Results.Json(user);
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound(new  {message = ex.Message});
            }
        }

        public static IResult GetAllUsers(IUserServices userServices)
        {
            try
            {
                var users = userServices.GetAllUsers();
                return Results.Json(users);
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound( new {message = ex.Message});
            }
        }

        public static IResult GetChildofUser(IUserServices userServices, string userId, int childId)
        {
            try
            {
                var child = userServices.GetChildOfUser(userId, childId);
                return Results.Json(child);
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound( new {message = ex.Message});
            }
            catch (ChildNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message });
            }
        }

        public static IResult GetChildsMeasurements(IUserServices userServices, string userId, int childId)
        {
            try
            {
                var measurements = userServices.GetChildsMeasurements(userId, childId);
                return Results.Json(measurements);
            }
            catch (Exception ex)
            {
                return Results.NotFound($"Exception {ex.Message}");
            }
        }

        public static IResult GetChildsAllergies(IUserServices userServices, string userId, int childId)
        {
            try
            {
                var allergies = userServices.GetChildsAllergies(userId, childId);
                return Results.Json(allergies);
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound(new {message = ex.Message});
            }
            catch (ChildNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message });
            }
        }

        public static IResult GetAllChildrensAllergies(IUserServices userServices, string userId)
        {
            try
            {
                var allergies = userServices.GetAllChildrensAllergies(userId);
                return Results.Json(allergies);
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message });
            }
            catch (ChildNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message });
            }
        }

        public static async Task<IResult> GetChildDietAi(IUserServices userServices, string userId, int childId, string food)
        {
            try
            {
                var childDiet = await userServices.GetChildDietAi(userId, childId, food);
                return Results.Json(childDiet);
            }
            catch (UserNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message });
            }
            catch(ChildNotFoundException ex)
            {
                return Results.NotFound(new { message = ex.Message });
            }
        }

        /*---------------------------------------- PUT -------------------------------------*/

        public static IResult UpdateAllergies(IUserServices userServices,string userId, int childId, List<AllergyDto> allergyDtos)
        {
            try
            {
                userServices.UpdateAllergies(userId, childId, allergyDtos);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.BadRequest($"Exception {ex.Message}");
            }

        }

        public static IResult UpdateChildInfo(IUserServices userServices,string userId, int childId, ChildDto childDto)
        {
            try
            {
                userServices.UpdateChild(userId, childId, childDto);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.BadRequest($"Exception {ex.Message}");
            }
        }

        public static IResult UpdateUserInfo(IUserServices userServices, string userId, UserDto userDto)
        {
            try
            {
                userServices.UpdateUser(userId, userDto);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.BadRequest($"Exception {ex.Message}");
            }
        }

        public static IResult DeleteChildAsync(IUserServices userServices, string userId, int childId) 
        {
           try
            {
                userServices.DeleteChildAsync(userId, childId);
                return Results.Ok("Child Deleted");
            } 
            catch
            {
                return Results.BadRequest("Child Not Deleted. Error triggered in Handler");
            }
        }

        public static IResult DeleteUserAsync(IUserServices userService, string userId, UserDto userDto)
        {
            try
            {
                userService.DeleteUserAsync(userId);
                return Results.Ok("User Deleted");
            }
            catch
            {
                return Results.BadRequest("User not deleted. Error triggered in Handler");
            }
        }

    }
}
