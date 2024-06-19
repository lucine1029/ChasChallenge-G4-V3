using ChasChallenge_G4_V3.Server.CustomExceptions;
using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.ViewModels;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class ServicesGetUserTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public void GetUser_Throws_Exception_If_User_Not_Found()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            userServices.GetUser("4");
        }

        [TestMethod]
        public void GetUser_Show_Correct_Info()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var child1 = new Child
            {
                Name = "Sean",
                NickName = "Seanare",
                birthdate = new DateTime(2024, 1, 21),
                Gender = "male",
                Allergies = new List<Allergy> { new Allergy { Name = "Laktos" } },
                Measurements = new List<Measurement> { new Measurement {  DateOfMeasurement = new DateTime(2024,1,30), HeadCircumference = 22.2, Height = 48, Weight = 7} },
                Id = 12
            };

            var child2 = new Child
            {
                Name = "Anna",
                NickName = "Banana",
                birthdate = new DateTime(2024, 4, 15),
                Gender = "female",
                Allergies = new List<Allergy> { new Allergy { Name = "Gluten" } },
                Measurements = new List<Measurement> { new Measurement { DateOfMeasurement = new DateTime(2024, 4, 21), HeadCircumference = 28, Height = 50, Weight = 8,  } },
                Id = 13
            };

            var user = new User
            {
                FirstName = "test-name",
                LastName = "test-lastName",
                Email = "test@gmail.com",
                Id = "1",
                Children = new List<Child> { child1, child2 }
            };
            context.Users.Add(user);
            context.SaveChanges();

            //Act
            var theUser = userServices.GetUser("1");

            //Assert
            Assert.IsNotNull(theUser);
            Assert.AreEqual("test-name", theUser.FirstName);
            Assert.AreEqual("test-lastName", theUser.LastName);
            Assert.AreEqual("test@gmail.com", theUser.Email);
            Assert.AreEqual(2, theUser.Children.Count);

            var usersChild1 = theUser.Children?.First(c=> c.Name == "Sean");
            Assert.IsNotNull(theUser.Children);
            Assert.AreEqual("Sean", usersChild1.Name);
            Assert.AreEqual("Seanare", usersChild1.NickName);
            Assert.AreEqual(new DateTime(2024,1,21), usersChild1.birthdate);
            Assert.AreEqual("male", usersChild1.Gender);
            Assert.AreEqual("Laktos", usersChild1.Allergies.First().Name); 
            Assert.AreEqual(new DateTime(2024,1,30), usersChild1.Measurements.First().DateOfMeasurement);
            Assert.AreEqual(22.2, usersChild1.Measurements.First().HeadCircumference);
            Assert.AreEqual(48, usersChild1.Measurements.First().Height);
            Assert.AreEqual(7, usersChild1.Measurements.First().Weight);

            var usersChild2 = theUser.Children?.First(c => c.Name == "Anna");
            Assert.IsNotNull(theUser.Children);
            Assert.AreEqual("Anna", usersChild2.Name);
            Assert.AreEqual("Banana", usersChild2.NickName);
            Assert.AreEqual(new DateTime(2024, 4, 15), usersChild2.birthdate);
            Assert.AreEqual("female", usersChild2.Gender);
            Assert.AreEqual("Gluten", usersChild2.Allergies.First().Name);
            Assert.AreEqual(new DateTime(2024, 4, 21), usersChild2.Measurements.First().DateOfMeasurement);
            Assert.AreEqual(28, usersChild2.Measurements.First().HeadCircumference);
            Assert.AreEqual(50, usersChild2.Measurements.First().Height);
            Assert.AreEqual(8, usersChild2.Measurements.First().Weight);
        }

        [TestMethod]
        public void GetUser_Show_User_Without_Childern()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db2").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user = new User
            {
                FirstName = "test-name",
                LastName = "test-lastName",
                Email = "test@gmail.com",
                Id = "5"
            };
            context.Users.Add(user);
            context.SaveChanges();

            //Act
            var theUser = userServices.GetUser(user.Id);

            //Assert
            Assert.IsNotNull(theUser);
            Assert.AreEqual("test-name", theUser.FirstName);
            Assert.AreEqual("test-lastName", theUser.LastName);
            Assert.AreEqual("test@gmail.com", theUser.Email);
            Assert.AreEqual(0, theUser.Children?.Count);
        }

        [TestMethod]
        public void GetUser_Show_User_With_Child_Without_Allergies_and_Measurement()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db3").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var child = new Child
            {
                Name = "Sean",
                NickName = "Seanare",
                birthdate = new DateTime(2024, 1, 21),
                Gender = "male",
                Id = 12
            };

            var user = new User
            {
                FirstName = "test-name",
                LastName = "test-lastName",
                Email = "test@gmail.com",
                Id = "1",
                Children = new List<Child> { child }
            };
            context.Users.Add(user);
            context.SaveChanges();

            //Act
            var theUser = userServices.GetUser(user.Id);

            //Assert
            Assert.IsNotNull(theUser);
            Assert.AreEqual("test-name", theUser.FirstName);
            Assert.AreEqual("test-lastName", theUser.LastName);
            Assert.AreEqual("test@gmail.com", theUser.Email);
            Assert.AreEqual(1, theUser.Children.Count);

            var theChild = theUser.Children?.First();
            Assert.IsNotNull(theChild);
            Assert.AreEqual("Sean", theChild.Name);
            Assert.AreEqual("Seanare", theChild.NickName);
            Assert.AreEqual(new DateTime(2024, 1, 21), theChild.birthdate);
            Assert.AreEqual("male", theChild.Gender);
            Assert.AreEqual(0,theChild.Allergies.Count);
            Assert.AreEqual(0, theChild.Measurements.Count);
        }
    }
}
