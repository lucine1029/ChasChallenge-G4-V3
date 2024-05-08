using System.ComponentModel.DataAnnotations;

namespace ChasChallenge_G4_V3.Server.Models.ViewModels
{
    public class LoginResultViewModel
    {

        public bool Success { get; set; }  // Indicates whether the login was successful
        public string ErrorMessage { get; set; }  // Contains an error message if login failed
        public string UserId { get; set; }  // Contains the user ID if the login was successful
    }
}
