using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Handlers;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Models.DTOs;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChasChallenge_G4_V3.Server.Services;
using Castle.Core.Configuration;

namespace ChasChallenge_G4_V3_ServerTests
{
    [TestClass]
    public class LoginServiceTests
    {
        private Mock<UserManager<User>> _mockUserManager;
        private Mock<SignInManager<User>> _mockSignInManager;

        [TestInitialize]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase(databaseName: "dbTest1").Options;
            var context = new ApplicationContext(options);

            var userStoreMock = new Mock<IUserStore<User>>();
            var _mockUserManager = new Mock<UserManager<User>>(
                userStoreMock.Object, null, null, null, null, null, null, null, null);

            var contextAccessorMock = new Mock<IHttpContextAccessor>();

            var configMock = new Mock<IConfiguration>();

            var claimsFactoryMock = new Mock<IUserClaimsPrincipalFactory<User>>();
            var _mockSignInManager = new Mock<SignInManager<User>>(_mockUserManager.Object, contextAccessorMock.Object, claimsFactoryMock.Object, null, null, null, null);

          



        }



        [TestMethod]
        public async void UserLoginAsync_Returns_Successful_LoginResultViewModel()
        {


            // Arrange

            var user = new User
            {
                Email = "test@test.com",
                FirstName = "TestFirstName",
                LastName = "TestLastName"
            };

            var password = "testPassword";

            await _mockUserManager.Object.CreateAsync(user, password);

            LoginUserDto loginUser = new LoginUserDto
            {
                Email = user.Email,
                Password = password,
            };

            // Act

            





            // Assert

           








        }
    }
}
