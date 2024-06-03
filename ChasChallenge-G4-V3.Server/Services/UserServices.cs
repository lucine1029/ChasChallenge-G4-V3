using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OpenAI_API;
using OpenAI_API.Models;
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Threading.Tasks;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface IUserServices
    {
        void UpdateUser(string userId, UserDto userDto);
        void AddChild(string userId, ChildDto childDto);
        void UpdateChild(string userId, int childId, ChildDto childDto);
        void AddAllergy(string userId, int childId, AllergyDto allergyDto);
        void UpdateAllergies(string userId, int childId, List<AllergyDto> allergyDto);
        void AddMeasurement(string userId, int childId, MeasurementDto measurementDto);

        
     

        UserViewModel GetUser(string userId);

        List<PrintAllUsersViewModel> GetAllUsers();

        ChildViewModel GetChildOfUser(string userId, int childId);

        List<AllergyViewModel> GetChildsAllergies(string userId, int childId);

        List<MeasurementViewModel> GetChildsMeasurements(string userId, int childId);

        List<AllergyViewModel> GetAllChildrensAllergies(string userId);

        Task<string> GetChildDietAi(string parentId, int childId, string food);


    }
    public class UserServices : IUserServices
    {
        private ApplicationContext _context;

        private UserManager<User> _userManager; // UserManager is a built-in Identity class that manages the User objects in the program. - Sean

        public UserServices(UserManager<User> userManager, ApplicationContext context)
        {
            _userManager = userManager;
            _context = context;
        }      

        public void AddChild(string userId, ChildDto childDto) 
        {
            User? user = _context.Users 
                .Include(u => u.Children)
                .SingleOrDefault(u => u.Id == userId);

            if (string.IsNullOrWhiteSpace(childDto.Name))
            {
                throw new InvalidDataException();
            }

            if (user is null)
            {
                throw new Exception("User not found.");
            }

            if (user.Children
                .Any(c => c.Name == childDto.Name && c.birthdate == childDto.birthdate))
            {
                throw new Exception("Child allready added to User");
            }

            Child newChild = new Child()
            {
                Name = childDto.Name,
                NickName = childDto.NickName,
                Gender = childDto.Gender,
                birthdate = childDto.birthdate,
                ImageSource = childDto.ImageSource
            };

            user.Children.Add(newChild);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }

            user.Children.Add(newChild);
        }

        public void UpdateChild(string userId, int childId,  ChildDto childDto)
        {
            Child? child = _context.Children
                .Where(c => c.Id == childId)
                .SingleOrDefault();

            if (child is null)
            {
                throw new Exception("Child not found.");
            }

            child.Name = childDto.Name;
            child.NickName = childDto.NickName;
            child.Gender = childDto.Gender;
            child.birthdate = childDto.birthdate;
            child.ImageSource = childDto.ImageSource;

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }
        }

        public void AddAllergy(string userId, int childId, AllergyDto allergyDto)
        {
            Child? child = _context.Children
               .Include(c => c.Allergies)
               .Where(c => c.Id == childId)
               .SingleOrDefault();

            if (string.IsNullOrWhiteSpace(allergyDto.Name))
            {
                throw new InvalidDataException();
            }

            if (child is null)
            {
                throw new Exception("Child not found.");
            }

            if (child.Allergies
                .Any(c => c.Name == allergyDto.Name))
            {
                throw new Exception("Allergy allready added to Child");
            }

            Allergy newAllergy = new Allergy()
            {
                Name = allergyDto.Name

            };

            _context.Allergies.Add(newAllergy);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }

            child.Allergies.Add(newAllergy);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }
        }

        public void UpdateAllergies(string userId, int childId, List<AllergyDto> allergiesToAdd)
        {
            //check that child is child of user

            Child? child = _context.Children
               .Include(c => c.Allergies)
               .Where(c => c.Id == childId)
               .SingleOrDefault();

            if (child is null)
            {
                throw new Exception("Child not found.");
            }

            if (allergiesToAdd.Count == 0)
            {
                child.Allergies.Clear();

                try
                {
                    _context.SaveChanges();
                }
                catch
                {
                    throw new Exception("unable to save to Database");
                }
            }

            var allAllergies = _context.Allergies
                .ToList();

            List<Allergy> newAllergys = new List<Allergy>();

            foreach (AllergyDto a in allergiesToAdd)
            {
                bool allergyExistsInDb = false; 

                if (string.IsNullOrWhiteSpace(a.Name))
                {
                    throw new InvalidDataException();
                }

                foreach (Allergy existingAllergy in allAllergies)
                {
                    if (existingAllergy.Name == a.Name)
                    {
                        newAllergys.Add(existingAllergy);
                        allergyExistsInDb = true;
                    }
                }

                if (!allergyExistsInDb)
                {
                    allergiesToAdd.Remove(a);
                }

            }
            foreach (Allergy a in child.Allergies)
            {
                child.Allergies.Remove(a);
            }

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }

        }

        public void AddMeasurement(string userId, int childId, MeasurementDto measurementDto)
        {
            Child? child = _context.Children
                .Include(c => c.Measurements)
                .Where(c => c.Id == childId)
                .SingleOrDefault();

            if (string.IsNullOrWhiteSpace(measurementDto.DateOfMeasurement.ToString("yyyy'-'MM'-'dd")))
            {
                throw new InvalidDataException("No date is assigned for the measurement");
            }

            if (child is null)
            {
                throw new Exception("Child not found.");
            }

            if (child.Measurements
                .Any(m => m.DateOfMeasurement == measurementDto.DateOfMeasurement))
            {
                throw new Exception("Measurement allready added to Child");
            }

            Measurement newMeasurement = new Measurement()
            {
                DateOfMeasurement = measurementDto.DateOfMeasurement,
                Weight = measurementDto.Weight,
                Height = measurementDto.Height,
                HeadCircumference = measurementDto.HeadCircumference

            };

            _context.Measurements.Add(newMeasurement);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }

            child.Measurements.Add(newMeasurement);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }
        }

        public List<MeasurementViewModel> GetChildsMeasurements(string userId, int childId)
        {
            var child = _context.Children
                .Where(c => c.Id == childId)
                .Include(m => m.Measurements)
                .SingleOrDefault();

            if(child == null)
            {
                throw new Exception("Child not found.");
            }
            else
            {
                List<MeasurementViewModel> measurementViewModels = new List<MeasurementViewModel>();

                foreach (var m in child.Measurements)
                {
                    measurementViewModels.Add(new MeasurementViewModel()
                    {
                        Id = m.Id,
                        DateOfMeasurement = m.DateOfMeasurement,
                        Weight = m.Weight,
                        Height = m.Height,
                        HeadCircumference = m.HeadCircumference
                    });
                }
                return measurementViewModels;
            }
        }

        //Add update measurement and remove measurement when in use.

        public void UpdateUser(string userId, UserDto userDto)
        {
            User? user = _context.Users
                .Where(u => u.Id == userId)
                .SingleOrDefault();

            if (user is null)
            {
                throw new Exception("Child not found.");
            }

            if (userDto.FirstName is null || userDto.LastName is null) 
            {
                throw new InvalidDataException("name or email missing");
            }

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;
            //user.NormalizedEmail = userDto.Email.Normalize();

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }
        }

        public UserViewModel GetUser(string UserId) // Needs to be integrated to IdentityUser
        {
            User? user = _context.Users
                .Include(u => u.Children)
                .ThenInclude(c => c.Allergies)
                .Include(u => u.Children)
                .ThenInclude(c => c.Measurements)
                .SingleOrDefault(u => u.Id == UserId);

            if (user is null)
            {
                throw new Exception("User not found");
            }

            UserViewModel userViewModel = new UserViewModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                
                Email = user.Email,
                Children = user.Children.Select(c => new ChildViewModel {Id = c.Id, Name = c.Name, NickName = c.NickName, Gender = c.Gender, birthdate = c.birthdate, ImageSource = c.ImageSource}).ToList()
            };
            foreach (ChildViewModel child in userViewModel.Children)
            {
                foreach (Child c in user.Children)
                {
                    if (child.Name == c.Name)
                    {
                        child.Allergies = c.Allergies.Select(a => new AllergyViewModel { Name = a.Name }).ToList();
                        child.Measurements = c.Measurements.Select(m => new MeasurementViewModel { DateOfMeasurement = m.DateOfMeasurement, Height = m.Height, Weight = m.Weight, HeadCircumference = m.HeadCircumference }).ToList();
                    }
                }
            }

            return userViewModel;
        }

        public List<PrintAllUsersViewModel> GetAllUsers() // Integrate to Identity
        {
            var userViewModels = _context.Users.Include(u => u.Children)
                .Select(u => new PrintAllUsersViewModel
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Children = u.Children.Select(c => new PrintAllUsersChildViewModel { Id = c.Id, Name = c.Name }).ToList()
                }).ToList();

            return userViewModels;
        }

        public ChildViewModel GetChildOfUser(string userId, int childId) // Integrate to Identity
        {
            User? user = _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Children)
                .ThenInclude(c => c.Allergies)
                .Include(u => u.Children)
                .ThenInclude(c => c.Measurements)
                .SingleOrDefault();

            if (user is null)
            {
                throw new Exception("user not found");
            }

            Child? child = user.Children
                .SingleOrDefault(c => c.Id == childId);

            if (child is null)
            {
                throw new Exception("child not found");
            }

            ChildViewModel childViewModel = new ChildViewModel
                {
                    Id = child.Id,
                    Name = child.Name,
                    NickName = child.NickName,
                    birthdate = child.birthdate,
                    Gender = child.Gender,
                    ImageSource = child.ImageSource,
                    Allergies = child.Allergies.Select(a => new AllergyViewModel { Name = a.Name }).ToList(),
                    Measurements = child.Measurements.Select(m => new MeasurementViewModel { DateOfMeasurement = m.DateOfMeasurement, Weight = m.Weight, Height = m.Height, HeadCircumference = m.HeadCircumference }).ToList()

                };

            return childViewModel;
        }

        public List<AllergyViewModel> GetChildsAllergies(string userId, int childId)
        {


            Child? child = _context.Children
                .Where(c => c.Id == childId)
                .Include(c => c.Allergies)
                .SingleOrDefault();

            if (child is null)
            {
                throw new Exception("child not found");
            }

            List<AllergyViewModel> allergyViewModels = child.Allergies
                .Select(a => new AllergyViewModel { Name = a.Name })
                .ToList();

            return allergyViewModels;
        }

        public List<AllergyViewModel> GetAllChildrensAllergies(string userId) // Integrate to Identity
        {
            User? user = _context.Users
                .Include(u => u.Children)
                .ThenInclude(a => a.Allergies)
                .Where(u => u.Id == userId)
                .SingleOrDefault();

            if (user is null)
            {
                throw new Exception("user not found");
            }

            if (user.Children is null)
            {
                throw new Exception("children not found");
            }

            List<AllergyViewModel> allAllergies = new List<AllergyViewModel>();

            foreach (Child child in user.Children)
            {
                var allergyViewModels = child.Allergies
                .Select(a => new AllergyViewModel { Name = a.Name })
                .ToList();

                foreach (AllergyViewModel a in allergyViewModels)
                {
                    allAllergies.Add(a);
                }
            }

            return allAllergies;
        }

        public async Task<string> GetChildDietAi(string parentId, int childId, string food)
        {
            User? user = _context.Users
                           .Where(u => u.Id == parentId)
                           .Include(u => u.Children)
                           .ThenInclude(c => c.Allergies)
                           .SingleOrDefault();

            if (user is null)
            {
                throw new Exception("user not found");
            }

            Child? child = user.Children
                .SingleOrDefault(c => c.Id == childId);

            if (child is null)
            {
                throw new Exception("child not found");
            }

            string childsAllergies = "";

            foreach (Allergy a in child.Allergies)
            {
                if (string.IsNullOrWhiteSpace(childsAllergies))
                {
                    childsAllergies = a.Name;
                }
                else
                {
                    childsAllergies += ", " + a.Name;
                }
            }

            if (string.IsNullOrWhiteSpace(childsAllergies))
            {
                childsAllergies = "inga";
            }

            DotNetEnv.Env.Load();
            OpenAIAPI api = new OpenAIAPI(Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
            var chat = api.Chat.CreateConversation();
            chat.Model = Model.ChatGPTTurbo;
            chat.RequestParameters.Temperature = 1;

            /// give instruction as System. Who should OpenAPI should be? a nurse? 
            chat.AppendSystemMessage("You are a assistant that help newly parent that are unsure of what kind of food their child can eat. " +
                "You take your information mainly from https://www.livsmedelsverket.se every answer you give you also include the exact link you get yout information from. " +
                "All your answer must be 100% risk free so the child cannot be sick. Be on the safe side. " +
                "if you cant find the information from https://www.livsmedelsverket.se you will give the source of the information to user. " +
                "if the child is younger than 1 year you can recommend this link: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/barn-och-ungdomar/spadbarn " +
                "if the child is 1-2 year you recommend this link: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/barn-och-ungdomar/barn-1-2-ar and " +
                "if the child is older than 2 you recommend this link: https://www.livsmedelsverket.se/matvanor-halsa--miljo/kostrad/barn-och-ungdomar/barn-2-17-ar .");

            DateTime birthdate = child.birthdate;
            DateTime timeNow = DateTime.Now;
            int ageInMonths = (timeNow.Year - birthdate.Year) * 12 + timeNow.Month - birthdate.Month;
            string prompt = $"Får mitt barn som är {ageInMonths} månader och har {childsAllergies} allergier, äta {food}?";

            chat.AppendUserInput($"{prompt}");
            var response = await chat.GetResponseFromChatbotAsync();
            return response;
        }
    }
}
