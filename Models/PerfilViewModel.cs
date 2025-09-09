using System.ComponentModel.DataAnnotations;

namespace Tarea2.Models
{
    public class PerfilViewModel
    {
        [Display(Name = "Nombre de usuario")]
        public string Username { get; set; } = string.Empty;
    }
}