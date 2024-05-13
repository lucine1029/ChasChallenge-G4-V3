
using ChasChallenge_G4_V3.Server.Data;
using ChasChallenge_G4_V3.Server.Handlers;
using ChasChallenge_G4_V3.Server.Models;
using ChasChallenge_G4_V3.Server.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ChasChallenge_G4_V3.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //db connection
            string connectionString = builder.Configuration.GetConnectionString("ApplicationContext");
            builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));

            // Add Identity services. You can add requirements to what a new user needs to enter to his/her Identity. 
            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 5; // Examples of optional requirement
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = false; // Remove digit requirement
                options.Password.RequireLowercase = false; // Remove lowercase requirement
                options.Password.RequireUppercase = false; // Remove uppercase requirement
                options.Password.RequireNonAlphanumeric = false; // Remove non-alphanumeric requirement           
                options.Password.RequiredUniqueChars = 0; // Set minimum unique characters in password (if needed)

            })
            .AddEntityFrameworkStores<ApplicationContext>()
            .AddDefaultTokenProviders();

            

            //Dependency injection
            builder.Services.AddScoped<IUserServices,UserServices>();
            builder.Services.AddScoped<ILoginServices, LoginServices>();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            //Post
            //app.MapPost("/user", UserHandler.AddUser);
            app.MapPost("/user/child", UserHandler.AddChild);
            //app.MapPost("/user/existingChild", UserHandler.AddExistingChild);
            app.MapPost("/user/child/allergy", UserHandler.AddAllergy);
            app.MapPost("/user/child/measurement", UserHandler.AddMeasurement);

            app.MapPost("/register", LoginHandler.RegisterUserAsync);
            app.MapPost("/login", LoginHandler.UserLoginAsync);


            ////Gets
            app.MapGet("/user", UserHandler.GetUser);
            app.MapGet("/allusers", UserHandler.GetAllUsers);
            app.MapGet("/user/child", UserHandler.GetChildofUser);
            app.MapGet("/user/child/allergies", UserHandler.GetChildAllergies);
            app.MapGet("/user/allchildren/allergies", UserHandler.GetAllChildrensAllergies);
            app.MapGet("/askDietAi/userId/childId", UserHandler.GetChildDietAi);


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
