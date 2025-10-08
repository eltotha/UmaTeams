using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Tarea2.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Tarea2.Data
{
    public class AppDbContext : IdentityDbContext<Usuario, IdentityRole<int>, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        // Tablas
        public DbSet<CharacterInfo> CharacterInfo { get; set; }
        public DbSet<UmaTeam> UmaTeams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de la tabla (opcional)
            modelBuilder.Entity<CharacterInfo>(entity =>
            {
                entity.HasKey(e => e.id); // PK
                entity.Property(e => e.name_en).HasMaxLength(255);
                entity.Property(e => e.category_label).HasMaxLength(255);
                entity.Property(e => e.category_label_en).HasMaxLength(255);
                entity.Property(e => e.category_value).HasMaxLength(255);
                entity.Property(e => e.color_main).HasMaxLength(50);
                entity.Property(e => e.color_sub).HasMaxLength(50);
                entity.Property(e => e.name_en_internal).HasMaxLength(255);
                entity.Property(e => e.name_jp).HasMaxLength(255);
                entity.Property(e => e.preferred_url).HasMaxLength(500);
                entity.Property(e => e.thumb_img).HasMaxLength(500);
            });

            // Configurar UmaTeams
            modelBuilder.Entity<UmaTeam>(entity =>
            {
                entity.ToTable("UmaTeams");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TeamName).IsRequired().HasMaxLength(255);
            });

            // Configurar TeamMembers
            modelBuilder.Entity<TeamMember>(entity =>
            {
                entity.ToTable("TeamMembers");
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.UmaName).IsRequired().HasMaxLength(255);
                entity.Property(e => e.UmaImage).HasMaxLength(500);
                
                // Configurar relaciones
                entity.HasOne(tm => tm.Team)
                      .WithMany(t => t.TeamMembers)
                      .HasForeignKey(tm => tm.TeamId)
                      .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(tm => tm.CharacterInfo)
                      .WithMany()
                      .HasForeignKey(tm => tm.UmaId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Mapear tabla Roles
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");
            });
        }

        // Seed dinámico desde API
        public async Task SeedFromApiAsync(HttpClient client)
        {
            if (!await CharacterInfo.AnyAsync())
            {
                var response = await client.GetAsync("https://umapyoi.net/api/v1/character/list");
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                await SaveChangesAsync();
            }
        }


    }
}
