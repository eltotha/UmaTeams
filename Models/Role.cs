using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Tarea2.Models;

namespace Tarea2.Models
{
    public class Role : IdentityRole<int>
    {
        public int Id { get; set; }
        public string Rol { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string ConcurrencyStamp { get; set; }

        // Navegación
        public ICollection<User> Users { get; set; }
        public ICollection<RoleClaim> RoleClaims { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
