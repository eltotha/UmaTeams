using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tarea2.Models
{
    public class UmaTeam
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string TeamName { get; set; } = string.Empty;

        // Navigation property para los miembros del equipo
        public virtual ICollection<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
    }
}