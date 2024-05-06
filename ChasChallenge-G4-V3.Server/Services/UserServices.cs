using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OpenAI_API;
using OpenAI_API.Models;
using System;
using System.Numerics;
using System.Threading.Tasks;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface IUserServices
    {
        void AddUser(UserDto userDto);
        void AddChild(int userId, ChildDto childDto);

        //void AddExistingChild(int userId, int childId);
        void AddAllergy(int childId, AllergyDto allergyDto);
        void AddMeasurement(int childId, MeasurementDto measurementDto);

        UserViewModel GetUser(int userId);

        List<UserViewModel> GetAllUsers();

        ChildViewModel GetChildOfUser(int userId, int childId);

        List<AllergyViewModel> GetChildsAllergies(int userId, int childId);

        List<AllergyViewModel> GetAllChildrensAllergies(int userId);

        Task<string> GetChildDietAi(int parentId, int childId, string food);


    }
    public class UserServices : IUserServices
    {
        private ApplicationContext _context;

        public UserServices(ApplicationContext context)
        {
            _context = context;
        }

        public void AddUser(UserDto userDto)
        {
            if (string.IsNullOrWhiteSpace(userDto.Email))
            {
                throw new InvalidDataException();
            }

            if (_context.Users.Any(u => u.Email == userDto.Email))
            {
                throw new Exception($"User with email : {userDto.Email} allready exists");
            }

            _context.Users
                .Add(new User()
                {
                    Name = userDto.Name,
                    Email = userDto.Email,
                    Password = userDto.Password
                });

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                throw new Exception("unable to save to Database");
            }

        }

        public void AddChild(int userId, ChildDto childDto)
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
                .Any(c => c.NickName == childDto.NickName))
            {
                throw new Exception("Child allready added to User");
            }

            Child newChild = new Child()
            {
                Name = childDto.Name,
                NickName = childDto.NickName,
                Gender = childDto.Gender,
                birthdate = childDto.birthdate
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
        public void AddAllergy(int childId, AllergyDto allergyDto)
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
        public void AddMeasurement(int childId, MeasurementDto measurementDto)
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

        public UserViewModel GetUser(int UserId)
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
                Name = user.Name,
                Password = user.Password,
                Email = user.Email,
                Children = user.Children.Select(c => new ChildViewModel { Name = c.Name, NickName = c.NickName, Gender = c.Gender, birthdate = c.birthdate }).ToList()
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

        public List<UserViewModel> GetAllUsers()
        {
            var userViewModels = _context.Users.Select(u => new UserViewModel { Name = u.Name, Password = u.Password, Email = u.Email }).ToList();

            return userViewModels;
        }

        public ChildViewModel GetChildOfUser(int userId, int childId)
        {
            User? user = _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.Children)
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

            ChildViewModel childViewModel = new ChildViewModel()
            {
                Name = child.Name,
                NickName = child.NickName,
                birthdate = child.birthdate,
                Gender = child.Gender
            };

            return childViewModel;
        }

        public List<AllergyViewModel> GetChildsAllergies(int userId, int childId)
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

        public List<AllergyViewModel> GetAllChildrensAllergies(int userId)
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

        public async Task<string> GetChildDietAi(int parentId, int childId, string food)
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
