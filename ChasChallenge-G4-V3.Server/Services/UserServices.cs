using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Numerics;

namespace ChasChallenge_G4_V3.Server.Services
{
    public interface IUserServices
    {
        
        void AddChild(string userId, ChildDto childDto);

        //void AddExistingChild(int userId, int childId);
        void AddAllergy(int childId, AllergyDto allergyDto);
        void AddMeasurement(int childId, MeasurementDto measurementDto);

     

        UserViewModel GetUser(string userId);

        List<UserViewModel> GetAllUsers();

        ChildViewModel GetChildOfUser(string userId, int childId);

        List<AllergyViewModel> GetChildsAllergies(string userId, int childId);

        List<AllergyViewModel> GetAllChildrensAllergies(string userId);


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

       
       

        public void AddChild(string userId, ChildDto childDto) // userId input parameters are now strings because Identity's own UserID are strings.
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
                Name = user.Name,
                
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

        public List<UserViewModel> GetAllUsers() // Integrate to Identity
        {
            var userViewModels = _context.Users.Select(u => new UserViewModel { Name = u.Name, Email = u.Email }).ToList();

            return userViewModels;
        }

        public ChildViewModel GetChildOfUser(string userId, int childId) // Integrate to Identity
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
    }
}
