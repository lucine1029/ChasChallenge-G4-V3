namespace ChasChallenge_G4_V3.Server.Models.ViewModels
{
    public class UserViewModel
    {
        public string? Name { get; set; }
        
        public string? Email { get; set; }

        public List<ChildViewModel>? Children { get; set; }
    }
}
