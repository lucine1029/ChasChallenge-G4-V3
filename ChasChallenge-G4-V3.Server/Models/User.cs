using Microsoft.AspNetCore.Identity;

namespace ChasChallenge_G4_V3.Server.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        
        public virtual ICollection<Child>? Children { get; set;}

    }
}
