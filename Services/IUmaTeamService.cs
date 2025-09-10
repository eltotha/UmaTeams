using System.Collections.Generic;
using System.Threading.Tasks;
using Tarea2.Models;

namespace Tarea2.Services
{
    public interface IUmaTeamService
    {
        Task<List<UmaTeam>> GetAllTeamsAsync();
        Task<UmaTeam> GetTeamByIdAsync(int id);
        Task<UmaTeam> CreateTeamAsync(string teamName);
        Task AddMemberToTeamAsync(int teamId, int umaId);
        Task RemoveMemberFromTeamAsync(int memberId);
        Task DeleteTeamAsync(int teamId);
        Task<List<CharacterInfo>> SearchCharactersAsync(string searchTerm);
    }
}