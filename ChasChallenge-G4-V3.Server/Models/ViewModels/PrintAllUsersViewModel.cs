namespace ChasChallenge_G4_V3.Server.Models.ViewModels
{
    public class PrintAllUsersViewModel
    {
        public string? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public string? Email { get; set; }
        public List<PrintAllUsersChildViewModel>? Children { get; set; }
    }
}
