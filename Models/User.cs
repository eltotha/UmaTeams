using Microsoft.AspNetCore.Identity;
using System;

namespace Tarea2.Models
{
    public class Usuario : IdentityUser<int>
    {
        public DateTime FechaRegistro { get; set; } = DateTime.Now;
    }
}
