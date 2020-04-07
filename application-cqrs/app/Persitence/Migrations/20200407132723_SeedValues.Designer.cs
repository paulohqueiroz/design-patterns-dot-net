﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persitence;

namespace Persitence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200407132723_SeedValues")]
    partial class SeedValues
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3");

            modelBuilder.Entity("Domain.Values", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Values");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Testando... 1"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Testando... 2"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Testando... 3"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Testando... 4"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Testando... 5"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
