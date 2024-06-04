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
using ChasChallenge_G4_V3.Server.CustomExceptions;

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class ServicesGetChildsAllergiesTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public void GetChildsAllergies_Throws_Exception_If_User_Not_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            //Act
            userServices.GetChildsAllergies("99", 22);
        }

        [TestMethod]
        [ExpectedException(typeof(ChildNotFoundException))]
        public void GetChildsAllergies_Throws_Exception_If_Child_Not_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user = new User
            {
                FirstName = "test-name",
                LastName = "test-lastName",
                Id = "1"
            };

            //Act
            userServices.GetChildsAllergies("1", 22);
        }

        [TestMethod]
        public void GetChildsAllergies_Shows_Correct_Info()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db2").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user1 = new User
            {
                FirstName = "test-name1",
                LastName = "test-lastName1",
                Email = "test1@gmail.com",
                Id = "3",
                Children = new List<Child>
                {
                    new Child
                    {
                        Id = 2,
                        Name ="test-child1",
                        NickName = "test-nickName1",
                        Gender = "male",
                        birthdate = new DateTime(2024,04,20),
                        Allergies = new List<Allergy>
                        {
                            new Allergy {Name = "Laktos", Id = 1},
                            new Allergy {Name = "Gluten", Id = 2}
                        },
                    }
                }
            };
            context.Users.Add(user1);
            context.SaveChanges();

            //Act
            var allAllergies = userServices.GetChildsAllergies("3", 2);

            //Assert
            Assert.AreEqual(2, allAllergies.Count);
            Assert.AreEqual("Laktos", allAllergies[0].Name);
            Assert.AreEqual("Gluten", allAllergies[1].Name);
        }

        [TestMethod]
        public void GetChildsAllergies_If_No_Allergies()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db2").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user1 = new User
            {
                FirstName = "test-name1",
                LastName = "test-lastName1",
                Email = "test1@gmail.com",
                Id = "4",
                Children = new List<Child>
                {
                    new Child
                    {
                        Id = 3,
                        Name ="test-child1",
                        NickName = "test-nickName1",
                        Gender = "male",
                        birthdate = new DateTime(2024,04,20),
                        Allergies = new List<Allergy>{}
                    }
                }
            };
            context.Users.Add(user1);
            context.SaveChanges();

            //Act
            var allAllergies = userServices.GetChildsAllergies("4", 3);

            //Assert
            Assert.IsNotNull(allAllergies);
            Assert.AreEqual(0, allAllergies.Count);
        }
    }
}
