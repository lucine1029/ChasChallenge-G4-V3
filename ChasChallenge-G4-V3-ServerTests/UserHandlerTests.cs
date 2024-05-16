using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Handlers;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
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
    public class UserHandlerTests
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
    }
}
