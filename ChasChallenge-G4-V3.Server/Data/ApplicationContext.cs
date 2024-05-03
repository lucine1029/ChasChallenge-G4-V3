using ChasChallenge_G4_V3.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChasChallenge_G4_V3.Server.Data
{
    public class ApplicationContext : IdentityDbContext<User> /* ApplicationContext inherits IdentityDbContext. The "<User>" is our own
                                                               * user model so that it can integrate custom fields. In our case, children and name. - Sean*/
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Child> Children { get; set; }
        public DbSet<Allergy> Allergies { get; set; }
        public DbSet<Measurement> Measurements { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    }
}
