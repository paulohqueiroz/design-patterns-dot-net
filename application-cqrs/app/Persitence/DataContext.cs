using Domain;
using Microsoft.EntityFrameworkCore;
using System;


namespace Persitence
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions options) : base(options)
        {

        } 

        public DbSet<Values> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Values>()
                   .HasData(
                        new Values { Id = 1, Name = "Testando... 1" },
                        new Values { Id = 2, Name = "Testando... 2" },
                        new Values { Id = 3, Name = "Testando... 3" },
                        new Values { Id = 4, Name = "Testando... 4" },
                        new Values { Id = 5, Name = "Testando... 5" });

        }

    }
}
