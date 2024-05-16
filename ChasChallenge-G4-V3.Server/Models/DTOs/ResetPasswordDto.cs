using System.ComponentModel.DataAnnotations;

namespace ChasChallenge_G4_V3.Server.Models.DTOs
{
    public class ResetPasswordDto
    {
        [Required]
        public string Password { get; set; } = null!; 
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match")]
        public string ConfirmPassword { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Token { get; set; } = null!;
    }
}
