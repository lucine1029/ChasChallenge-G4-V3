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
    public class ServicesGetChildOfUserTests
    {
        [TestMethod]
        [ExpectedException(typeof(UserNotFoundException))]
        public void GetChildOfUser_Throws_Exception_If_User_Not_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db4").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            //Act
            userServices.GetChildOfUser("1", 2);
        }

        [TestMethod]
        [ExpectedException(typeof(ChildNotFoundException))]
        public void GetChildOfUser_Throws_Exception_If_Child_Not_Found()
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
            userServices.GetChildOfUser("1", 2);
        }

        [TestMethod]
        public void GetChildOfUser_Show_Correct_Info()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "test-db5").Options;
            var context = new ApplicationContext(options);
            var userStore = new UserStore<User>(context);
            var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
            var userServices = new UserServices(userManager, context);

            var user1 = new User
            {
                FirstName = "test-name1",
                LastName = "test-lastName1",
                Email = "test1@gmail.com",
                Id = "1",
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
                    }
                }
            };
            context.Users.Add(user1);
            context.SaveChanges();

            //Act
            var theUser = userServices.GetChildOfUser("1", 2);

            //Assert
            Assert.IsNotNull(theUser);
            Assert.AreEqual("test-child1", theUser.Name);
            Assert.AreEqual("test-nickName1", theUser.NickName);
            Assert.AreEqual(new DateTime(2024, 04, 20), theUser.birthdate);
            Assert.AreEqual("male", theUser.Gender);
            Assert.AreEqual(2, theUser.Allergies.Count);
            Assert.AreEqual("Laktos", theUser.Allergies[0].Name);
            Assert.AreEqual("Gluten", theUser.Allergies[1].Name);
            Assert.AreEqual(2, theUser.Measurements.Count);
            Assert.AreEqual(new DateTime(2024, 4, 21), theUser.Measurements[0].DateOfMeasurement);
            Assert.AreEqual(20, theUser.Measurements[0].Height);
            Assert.AreEqual(7, theUser.Measurements[0].Weight);
            Assert.AreEqual(25, theUser.Measurements[0].HeadCircumference);
            Assert.AreEqual(new DateTime(2024, 4, 28), theUser.Measurements[1].DateOfMeasurement);
            Assert.AreEqual(24, theUser.Measurements[1].Height);
            Assert.AreEqual(9, theUser.Measurements[1].Weight);
            Assert.AreEqual(28, theUser.Measurements[1].HeadCircumference);
        }
    }
}