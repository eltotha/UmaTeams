using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tarea2.Models
{
    public class TeamMember
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TeamId { get; set; }

        [Required]
        public int UmaId { get; set; }

        [Required]
        [MaxLength(255)]
        public string UmaName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? UmaImage { get; set; }

        [ForeignKey("TeamId")]
        public virtual UmaTeam Team { get; set; } = null!;

        [ForeignKey("UmaId")]
        public virtual CharacterInfo CharacterInfo { get; set; } = null!;
    }
}