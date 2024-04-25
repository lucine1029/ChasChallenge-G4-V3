namespace ChasChallenge_G4_V3.Server.Models
{
    internal class Allergy
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Child> Children { get; set; }    
    }
}
