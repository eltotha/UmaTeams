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

     public class User : IdentityUser<int>
    {
        // Navegación a roles
         public ICollection<IdentityUserRole<int>> UserRoles { get; set; } = new List<IdentityUserRole<int>>();
    }

    public class Role : IdentityRole<int>
    {
        public ICollection<IdentityUserRole<int>> UserRoles { get; set; } = new List<IdentityUserRole<int>>();
    }

    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        // Tablas
        public DbSet<CharacterInfo> CharacterInfo { get; set; }


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

            modelBuilder.Entity<CharacterInfo>().HasKey(c => c.id);
            modelBuilder.Entity<IdentityUserRole<int>>().HasKey(ur => new { ur.UserId, ur.RoleId });
        }

        // Seed dinámico desde API
        public async Task SeedFromApiAsync(HttpClient client)
        {
            if (!await CharacterInfo.AnyAsync())
            {
                var response = await client.GetAsync("https://umapyoi.net/api/v1/character/list");
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                var characters = JsonConvert.DeserializeObject<List<CharacterInfo>>(json) ?? new List<CharacterInfo>();

                await CharacterInfo.AddRangeAsync(characters);
                await SaveChangesAsync();
            }
        }
    }
}
