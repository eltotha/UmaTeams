using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Tarea2.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Tarea2.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        // Tablas
        public DbSet<CharacterInfo> CharacterInfo { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserClaim> UserClaims { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        public DbSet<RoleClaim> RoleClaims { get; set; }

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

            // UserRole PK compuesta
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            // UserLogin PK compuesta
            modelBuilder.Entity<UserLogin>()
                .HasKey(ul => new { ul.LoginProvider, ul.ProviderKey });

            // UserToken PK compuesta
            modelBuilder.Entity<UserToken>()
                .HasKey(ut => new { ut.UserId, ut.LoginProvider, ut.Name });

            // Relaciones
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.Rol)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserClaim>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserClaims)
                .HasForeignKey(uc => uc.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserLogin>()
                .HasOne(ul => ul.User)
                .WithMany(u => u.UserLogins)
                .HasForeignKey(ul => ul.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserToken>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.UserTokens)
                .HasForeignKey(ut => ut.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RoleClaim>()
                .HasOne(rc => rc.Role)
                .WithMany(r => r.RoleClaims)
                .HasForeignKey(rc => rc.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
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
