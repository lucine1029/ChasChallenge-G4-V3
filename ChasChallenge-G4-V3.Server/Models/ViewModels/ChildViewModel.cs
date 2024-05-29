namespace ChasChallenge_G4_V3.Server.Models.ViewModels
{
    public class ChildViewModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NickName { get; set; }
        public string? Gender { get; set; }

        public string? ImageSource {  get; set; }
        public DateTime? birthdate { get; set; }

        public List<AllergyViewModel> Allergies { get; set; } = new List<AllergyViewModel>();

        public List<MeasurementViewModel> Measurements { get; set; } = new List<MeasurementViewModel>();
    }
}
