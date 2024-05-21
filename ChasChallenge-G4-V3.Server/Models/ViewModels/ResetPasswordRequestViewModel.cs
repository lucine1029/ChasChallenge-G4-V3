namespace ChasChallenge_G4_V3.Server.Models.ViewModels
{
    public class ResetPasswordRequestViewModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
