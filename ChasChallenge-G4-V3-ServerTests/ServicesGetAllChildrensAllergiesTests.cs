using ChasChallenge_G4_V3.Server.CustomExceptions;
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

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class ServicesGetAllChildrensAllergiesTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public void GetAllChildrensAllergies_Throws_Exception_If_User_Is_Null()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db1").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            //Act
            userServices.GetAllChildrensAllergies("99");
        }

        [TestMethod]
        [ExpectedException(typeof(ChildNotFoundException))]
        public void GetAllChildrensAllergies_Throws_Exception_If_Child_Is_Null()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "GetAllChildrensAllergies-db").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user = new User
            {
                FirstName = "test-name",
                LastName = "test-lastName",
                Id = "98",
            };
            context.Users.Add(user);
            context.SaveChanges();

            //Act
            userServices.GetAllChildrensAllergies("98");
        }

        [TestMethod]
        public void GetAllChildrensAllergies_Shows_Correct_Info()
        {
            //Assert
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "GetAllChildrensAllergies-db2").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager,context);

            var user1 = new User
            {
                FirstName = "test-name1",
                LastName = "test-lastName1",
                Email = "test1@gmail.com",
                Id = "5",
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
                        Measurements = new List<Measurement>
                        {
                            new Measurement { Id = 1, DateOfMeasurement = new DateTime(2024,4,21), HeadCircumference = 25, Height = 20, Weight = 7},
                            new Measurement { Id = 2, DateOfMeasurement = new DateTime(2024,4,28), HeadCircumference = 28, Height = 24, Weight = 9}
                        }
                    },
                    new Child
                    {
                        Id = 3,
                        Name ="test-child2",
                        NickName = "test-nickName2",
                        Gender = "female",
                        birthdate = new DateTime(2023,04,20),
                        Allergies = new List<Allergy>
                        {
                            new Allergy {Name = "Laktos2", Id = 3},
                            new Allergy {Name = "Gluten2", Id = 4}
                        },
                        Measurements = new List<Measurement>
                        {
                            new Measurement { Id = 3, DateOfMeasurement = new DateTime(2023,4,21), HeadCircumference = 35, Height = 30, Weight = 8},
                            new Measurement { Id = 4, DateOfMeasurement = new DateTime(2023,4,28), HeadCircumference = 38, Height = 34, Weight = 10}
                        }
                    },
                }
            };
            context.Users.Add(user1);
            context.SaveChanges();

            //Act
            var theAllergies = userServices.GetAllChildrensAllergies("5");

            //Assert
            Assert.IsNotNull(theAllergies);
            Assert.AreEqual(4, theAllergies.Count);
            Assert.AreEqual("Laktos", theAllergies[0].Name);
            Assert.AreEqual("Gluten", theAllergies[1].Name);
            Assert.AreEqual("Laktos2", theAllergies[2].Name);
            Assert.AreEqual("Gluten2", theAllergies[3].Name);

            //var expectedAllergies = new List<string> { "Laktos", "Gluten", "Laktos2", "Gluten2" };
            //for (int i = 0; i < expectedAllergies.Count; i++)
            //{
            //    Assert.AreEqual(expectedAllergies[i], theAllergies[i].Name);
            //}
        }
    }
}
