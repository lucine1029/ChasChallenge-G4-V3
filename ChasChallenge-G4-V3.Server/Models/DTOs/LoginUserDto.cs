using System.ComponentModel.DataAnnotations;

namespace ChasChallenge_G4_V3.Server.Models.DTOs
{
    public class LoginUserDto
    {
        [EmailAddress]
        public string Email { get; set; }

        [MinLength(6)]
        public string Password { get; set; }
    }
}
