
namespace Tarea2.Models
{
    public class RoleClaim
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public Role Role { get; set; }
    }
}
