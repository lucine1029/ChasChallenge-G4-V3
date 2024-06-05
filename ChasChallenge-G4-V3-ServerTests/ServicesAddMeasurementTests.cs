using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Models.DTOs;
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
using System.Data;

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class ServicesAddMeasurementTests
    {
       // [TestMethod]
       // [ExpectedException(typeof(FormatException))]
        //public void AddMeasurement_Throws_Exception_If_No_Date_Added()
        //{
        //    //Arrange
        //    var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddMeasurement-db1").Options;
        //    var context = new ApplicationContext(options);
        //    var userStore = new UserStore<User>(context);
        //    var userManager = new UserManager<User>(userStore, null, null, null, null, null, null, null, null);
        //    var userServices = new UserServices(userManager, context);

        //    var child1 = new Child
        //    {
        //        Id = 5,
        //        Name = "test-child1",
        //        NickName = "test-nickName1",
        //        Gender = "male",
        //        birthdate = new DateTime(2024, 04, 20)
        //    };
        //    context.Children.Add(child1);
        //    context.SaveChanges();

        //    var measureDto = new MeasurementDto();


        //    //Act
        //    userServices.AddMeasurement(child1.Id, measureDto);
        //}

        [TestMethod]
        [ExpectedException(typeof(ChildNotFoundException))]
        public void AddMeasurement_Throws_Exception_If_No_Child_Found()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddMeasurement-db2").Options;
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
            context.Children.Add(child1);
            context.SaveChanges();

            var measureDto = new MeasurementDto { DateOfMeasurement = new DateTime(2024 - 02 - 01), HeadCircumference = 30, Height = 55, Weight = 10 };


            //Act
            userServices.AddMeasurement(77, measureDto);
        }

        [TestMethod]
        [ExpectedException(typeof(DuplicateNameException))]
        public void AddMeasurement_Throws_Exception_If_Same_Date_Adds_Twice()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddMeasurement-db2").Options;
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
            context.Children.Add(child1);
            context.SaveChanges();

            var measureDto = new MeasurementDto { DateOfMeasurement = new DateTime(2024 - 02 - 01), HeadCircumference = 30, Height = 55, Weight = 10 };
            var measureDto2 = new MeasurementDto { DateOfMeasurement = new DateTime(2024 - 02 - 01), HeadCircumference = 30, Height = 55, Weight = 10 };


            //Act
            userServices.AddMeasurement(5, measureDto);
            userServices.AddMeasurement(5, measureDto2);
        }

        [TestMethod]
        public void AddMeasurement_Adds_Correct()
        {
            //Arrange
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "AddMeasurement-db2").Options;
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
            context.Children.Add(child1);
            context.SaveChanges();

            var measureDto = new MeasurementDto { DateOfMeasurement = new DateTime(2024 - 02 - 01), HeadCircumference = 30, Height = 55, Weight = 10 };


            //Act
            userServices.AddMeasurement(5, measureDto);

            //Assert
            var childMeasurments = context.Children.Include(m => m.Measurements).Where(u=>u.Id == 5).FirstOrDefault();
            Assert.IsNotNull(childMeasurments);
            Assert.AreEqual(new DateTime(2024-02-01), childMeasurments.Measurements.First().DateOfMeasurement);
            Assert.AreEqual(30, childMeasurments.Measurements.First().HeadCircumference);
            Assert.AreEqual(55, childMeasurments.Measurements.First().Height);
            Assert.AreEqual(10, childMeasurments.Measurements.First().Weight);
        }
    }
}
