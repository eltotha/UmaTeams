using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Tarea2.Data;
using Tarea2.Models;

namespace Tarea2.Services
{
    public class UmaTeamService : IUmaTeamService
    {
        private readonly AppDbContext _context;

        public UmaTeamService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UmaTeam>> GetAllTeamsAsync()
        {
            return await _context.UmaTeams
                .Include(t => t.TeamMembers)
                .ThenInclude(tm => tm.CharacterInfo)
                .ToListAsync();
        }

        public async Task<UmaTeam> GetTeamByIdAsync(int id)
        {
            return await _context.UmaTeams
                .Include(t => t.TeamMembers)
                .ThenInclude(tm => tm.CharacterInfo)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<UmaTeam> CreateTeamAsync(string teamName)
        {
            var team = new UmaTeam { TeamName = teamName };
            _context.UmaTeams.Add(team);
            await _context.SaveChangesAsync();
            return team;
        }

        public async Task AddMemberToTeamAsync(int teamId, int umaId)
        {
            var character = await _context.CharacterInfo
                .FirstOrDefaultAsync(c => c.id == umaId);
            
            if (character == null)
            {
                throw new System.Exception($"Personaje con ID {umaId} no encontrado");
            }

            var member = new TeamMember
            {
                TeamId = teamId,
                UmaId = umaId,
                UmaName = character.name_en,
                UmaImage = character.thumb_img
            };
            
            _context.TeamMembers.Add(member);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveMemberFromTeamAsync(int memberId)
        {
            var member = await _context.TeamMembers.FindAsync(memberId);
            if (member != null)
            {
                _context.TeamMembers.Remove(member);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteTeamAsync(int teamId)
        {
            var team = await _context.UmaTeams
                .Include(t => t.TeamMembers)
                .FirstOrDefaultAsync(t => t.Id == teamId);
            
            if (team != null)
            {
                _context.UmaTeams.Remove(team);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<CharacterInfo>> SearchCharactersAsync(string searchTerm)
        {
            return await _context.CharacterInfo
                .Where(c => c.name_en.Contains(searchTerm) || c.name_jp.Contains(searchTerm))
                .Take(10)
                .ToListAsync();
        }
    }
}