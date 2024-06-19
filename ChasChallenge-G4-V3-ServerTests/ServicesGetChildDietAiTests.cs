using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Cmp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChasChallenge_G4_V3.Server.CustomExceptions;

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class ServicesGetChildDietAiTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public async Task GetChildDietAi_Throws_Exception_If_User_Not_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "GetChildDietAi-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            //Act
           await userServices.GetChildDietAi("22", 2, "spenat");
        }

        [TestMethod]
        [ExpectedException(typeof(ChildNotFoundException))]
        public async Task GetChildDietAi_Throws_Exception_If_Child_Not_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "GetChildDietAi-db2").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user = new User
            {
                FirstName = "test-name",
                LastName = "test-lastName",
                Id = "22",
            };
            context.Users.Add(user);
            context.SaveChanges();

            //Act
            await userServices.GetChildDietAi(user.Id, 2, "spenat");
        }
    }
}
