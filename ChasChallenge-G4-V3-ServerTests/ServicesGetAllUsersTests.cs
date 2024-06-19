using ChasChallenge_G4_V3.Server.CustomExceptions;
using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
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
    public class ServicesGetAllUsersTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public void GetAllUsers_Throws_Exception_If_No_Users_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db12").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);


            //Act
            userServices.GetAllUsers();
        }

        [TestMethod]
        public void GetAllUsers_Show_User_With_Children_Correct()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db2").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user1 = new User
            {
                Id = "1",
                FirstName = "test-name-1",
                LastName = "test-lastName-1",
                Children = new List<Child>
                {
                    new Child { Id = 13, Name = "Child1", NickName = "Child1Nick", birthdate = new DateTime(2024, 1, 21), Gender = "male" }
                }
            };
            var user2 = new User
            {
                Id = "2",
                FirstName = "test-name-2",
                LastName = "test-lastName-2",
                Children = new List<Child>
                {
                    new Child { Id = 14, Name = "Child2", NickName = "Child2Nick", birthdate = new DateTime(2023, 1, 21), Gender = "female" }
                }
            };
            context.Users.AddRange(user1, user2);
            context.SaveChanges();

            //Act
            var users = userServices.GetAllUsers();

            //Assert
            Assert.IsNotNull(users);
            Assert.AreEqual(2, users.Count);

            var theUser1 = users.First(u => u.Id == "1"); 
            var theUser2 = users.First(u => u.Id == "2");

            Assert.AreEqual("1", theUser1.Id);
            Assert.AreEqual("test-name-1", theUser1.FirstName);
            Assert.AreEqual("test-lastName-1", theUser1.LastName);
            Assert.AreEqual(1, theUser1.Children.Count);
            Assert.AreEqual(13, theUser1.Children.First().Id);
            Assert.AreEqual("Child1", theUser1.Children.First().Name);

            Assert.AreEqual("2", theUser2.Id);
            Assert.AreEqual("test-name-2", theUser2.FirstName);
            Assert.AreEqual("test-lastName-2", theUser2.LastName);
            Assert.AreEqual(1, theUser2.Children.Count);
            Assert.AreEqual(14, theUser2.Children.First().Id);
            Assert.AreEqual("Child2", theUser2.Children.First().Name);
        }

        [TestMethod]
        public void GetAllUsers_Show_User_Without_Children_Correct()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db4").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user1 = new User
            {
                Id = "3",
                FirstName = "test-name-1",
                LastName = "test-lastName-1",
                Children = new List<Child>()
            };
            var user2 = new User
            {
                Id = "4",
                FirstName = "test-name-2",
                LastName = "test-lastName-2",
                Children = new List<Child>()
            };
            context.Users.AddRange(user1, user2);
            context.SaveChanges();

            //Act
            var users = userServices.GetAllUsers();

            //Assert
            Assert.IsNotNull(users);
            Assert.AreEqual(2, users.Count);

            var theUser1 = users.First(u => u.Id == "3");
            var theUser2 = users.First(u => u.Id == "4");

            Assert.AreEqual("3", theUser1.Id);
            Assert.AreEqual("test-name-1", theUser1.FirstName);
            Assert.AreEqual("test-lastName-1", theUser1.LastName);
            Assert.AreEqual(0, theUser1.Children.Count);

            Assert.AreEqual("4", theUser2.Id);
            Assert.AreEqual("test-name-2", theUser2.FirstName);
            Assert.AreEqual("test-lastName-2", theUser2.LastName);
            Assert.AreEqual(0, theUser2.Children.Count);
        }
    }
}
