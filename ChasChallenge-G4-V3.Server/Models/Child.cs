namespace ChasChallenge_G4_V3.Server.Models
{
    public class Child
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NickName { get; set; }
        public string? Gender { get; set; }
        public DateTime birthdate { get; set; }

        public string? ImageSource { get; set; }
        public virtual ICollection<User> Users { get; set; } = new List<User>();
        public virtual ICollection<Allergy> Allergies { get; set; } = new List<Allergy>();
        public virtual ICollection<Measurement> Measurements { get; set; } = new List <Measurement>();
    }
}
