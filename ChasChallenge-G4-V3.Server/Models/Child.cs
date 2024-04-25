namespace ChasChallenge_G4_V3.Server.Models
{
    internal class Child
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? NickName { get; set; }
        public int? Gender { get; set; }
        //sex is as (ISO/IEC 5218) international standard stored as
        /*
            0 = Not known;
            1 = Male;
            2 = Female;
            9 = Not applicable.
        */
        
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Allergy> Allergies { get; set; }
        public virtual ICollection<Measurement> Measurements { get; set; }
    }
}
