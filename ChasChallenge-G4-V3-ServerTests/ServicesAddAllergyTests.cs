using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.CustomExceptions;
using System.Data;

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class ServicesAddAllergyTests
    {
        [TestMethod]
        [ExpectedException(typeof(InvalidDataException))]
        public void AddAllergy_Throws_Exception_If_No_Name_Is_Filled()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddAllergy-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var child1 = new Child
            {
                Id = 5,
                Name = "test-child1",
                NickName = "test-nickName1",
                Gender = "male",
                birthdate = new DateTime(2024, 04, 20)
            };

            var allergi = new AllergyDto { Name = ""};

            //Act
            userServices.AddAllergy(child1.Id, allergi);
        }

        [TestMethod]
        [ExpectedException(typeof(ChildNotFoundException))]
        public void AddAllergy_Throws_Exception_If_No_Child_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddAllergy-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var child1 = new Child
            {
                Id = 5,
                Name = "test-child1",
                NickName = "test-nickName1",
                Gender = "male",
                birthdate = new DateTime(2024, 04, 20)
            };
            context.Add(child1);
            context.SaveChanges();
            var allergi = new AllergyDto { Name = "Laktos" };

            //Act
            userServices.AddAllergy(55, allergi);
        }

        [TestMethod]
        [ExpectedException(typeof(DuplicateNameException))]
        public void AddAllergy_Throws_Exception_If_Same_Allery_Added_Twice()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddAllergy-db3").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var child1 = new Child
            {
                Id = 5,
                Name = "test-child1",
                NickName = "test-nickName1",
                Gender = "male",
                birthdate = new DateTime(2024, 04, 20)
            };
            context.Add(child1);
            context.SaveChanges();
            var allergi = new AllergyDto { Name = "Laktos" };
            var allergi2 = new AllergyDto { Name = "Laktos" };

            //Act
            userServices.AddAllergy(5, allergi);
            userServices.AddAllergy(5, allergi2);
        }

        [TestMethod]
        public void AddAllergy_Adds_Correct()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddAllergy-db4").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var child1 = new Child
            {
                Id = 5,
                Name = "test-child1",
                NickName = "test-nickName1",
                Gender = "male",
                birthdate = new DateTime(2024, 04, 20),
                Allergies = new List<Allergy>()
            };
            context.Add(child1);
            context.SaveChanges();
            var allergiDto = new AllergyDto { Name = "Laktos" };

            //Act
            userServices.AddAllergy(5, allergiDto);

            //Assert
            var childWithAllergies = context.Children.Include(x => x.Allergies).Where(u => u.Id == 5).FirstOrDefault();
            Assert.IsNotNull(childWithAllergies);
            Assert.AreEqual("Laktos", childWithAllergies.Allergies.First().Name);

            //Act & Assert for duplicate allergy
            //try
            //{
            //    userServices.AddAllergy(5, allergiDto);
            //    Assert.Fail("Expected DuplicateNameException was not thrown.");
            //}
            //catch (DuplicateNameException ex)
            //{
            //    Assert.AreEqual("Allergy already added to Child", ex.Message);
            //}
        }
    }
}
