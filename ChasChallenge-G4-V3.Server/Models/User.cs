namespace ChasChallenge_G4_V3.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public virtual ICollection<Child>? Children { get; set;}

    }
}
