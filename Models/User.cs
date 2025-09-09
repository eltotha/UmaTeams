using System;
using System.Collections.Generic;
using Tarea2.Models;
using Microsoft.AspNetCore.Identity;

namespace Tarea2.Models
{
    public class User : IdentityUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string NormalizedUsername { get; set; }
        public int Rol { get; set; }
        public string Passwd { get; set; }
        public string Email { get; set; } = "default@email.com";
        public string NormalizedEmail { get; set; } = "DEFAULT@EMAIL.COM";
        public bool EmailConfirmed { get; set; } = true;
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; } = false;
        public bool TwoFactorEnabled { get; set; } = false;
        public DateTime? LockoutEnd { get; set; }
        public bool LockoutEnabled { get; set; } = false;
        public int AccessFailedCount { get; set; } = 0;
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }

        // Navegación
        public Role Role { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<UserClaim> UserClaims { get; set; }
        public ICollection<UserLogin> UserLogins { get; set; }
        public ICollection<UserToken> UserTokens { get; set; }
    }
}
