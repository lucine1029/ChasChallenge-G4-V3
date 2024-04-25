﻿using ChasChallenge_G4_V3.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ChasChallenge_G4_V3.Server.Data
{
    internal class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Child> Children { get; set; }
        public DbSet<Allergy> Allergies { get; set; }
        public DbSet<Measurement> Measurements { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    }
}
