using ChasChallenge_G4_V3.Server.CustomExceptions;
using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Handlers;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChasChallenge_G4_V3_ServerTests
{
    public class TestApplicationContext : ApplicationContext
    {
        public TestApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public override int SaveChanges()
        {
            throw new Exception("unable to save to Database");
        }
    }

    [TestClass]
    public class ServicesAddChildTests
    {
        [TestMethod]
        public void AddChild_Adds_Child()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);
            var user = new User
            {
                Id = "1",
                FirstName = "Test-FirstName",
                LastName = "Test-LastName",

            };
            context.Users.Add(user);
            context.SaveChanges();

            // Act
            userServices.AddChild("1", new ChildDto
            {
                Name = "test-name",
                NickName = "test-nickname",
                birthdate = DateTime.Now,
                Gender = "male"
            });
            context.SaveChanges();

            //Assert
            Assert.AreEqual(1, context.Children.Count());
        }

        [TestMethod]
        public void AddChild_Correct_Info_Gets_Added()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);
            var user = new User
            {
                Id = "2",
                FirstName = "Test-FirstName",
                LastName = "Test-LastName",

            };
            context.Users.Add(user);
            context.SaveChanges();

            var childDto = new ChildDto
            {
                Name = "test-name",
                NickName = "test-nickname",
                birthdate = DateTime.Now,
                Gender = "male"
            };
            userServices.AddChild("2", childDto);
            context.SaveChanges();

            // Act
            var theChild = context.Children.FirstOrDefault();
            Assert.IsNotNull(theChild);


            //Assert
            Assert.AreEqual(childDto.Name, theChild.Name);
            Assert.AreEqual(childDto.NickName, theChild.NickName);
            Assert.AreEqual(childDto.birthdate.Date, theChild.birthdate.Date);
            Assert.AreEqual(childDto.Gender, theChild.Gender);
        }

        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public void AddChild_Exception_If_Wrong_UserId()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            //Assert
            var childDto = new ChildDto
            {
                Name = "test-name",
                NickName = "test-nickname",
                birthdate = DateTime.Now,
                Gender = "male"
            };
            userServices.AddChild("3", childDto);
            context.SaveChanges();
        }

        [TestMethod]
        [ExpectedException(typeof(DuplicateNameException))]
        public void AddChild_Execption_If_same_NickName()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var firstChild = new ChildDto
            {
                Name = "test-name",
                NickName = "test-nickname",
                birthdate = DateTime.Now,
                Gender = "male"
            };
            userServices.AddChild("2", firstChild);
            context.SaveChanges();

            var secondChild = new ChildDto
            {
                Name = "test-name",
                NickName = "test-nickname",
                birthdate = DateTime.Now,
                Gender = "male"
            };
            userServices.AddChild("2", secondChild);
            context.SaveChanges();

        }

        [TestMethod]
        [ExpectedException(typeof(InvalidDataException))]
        public void AddChild_Execption_If_No_Name_Is_Given()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var firstChild = new ChildDto { NickName = "test-nickname" };
            userServices.AddChild("2", firstChild);
            context.SaveChanges();
        }
    }
}
