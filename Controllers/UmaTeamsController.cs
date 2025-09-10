using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Tarea2.Services;
using Tarea2.Models;

namespace Tarea2.Controllers
{
    [Authorize]
    public class UmaTeamsController : Controller
    {
        private readonly IUmaTeamService _umaTeamService;

        public UmaTeamsController(IUmaTeamService umaTeamService)
        {
            _umaTeamService = umaTeamService;
        }

        public async Task<IActionResult> Index()
        {
            var teams = await _umaTeamService.GetAllTeamsAsync();
            return View(teams);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam(string teamName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(teamName) || teamName.Length < 2)
                {
                    TempData["ErrorMessage"] = "El nombre del equipo debe tener al menos 2 caracteres";
                    return RedirectToAction(nameof(Index));
                }

                await _umaTeamService.CreateTeamAsync(teamName.Trim());
                TempData["SuccessMessage"] = $"Equipo '{teamName}' creado exitosamente";
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error al crear el equipo: " + ex.Message;
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> AddMember(int teamId, int umaId)
        {
            try
            {
                if (umaId <= 0)
                {
                    TempData["ErrorMessage"] = "ID de personaje inválido";
                    return RedirectToAction(nameof(Index));
                }

                await _umaTeamService.AddMemberToTeamAsync(teamId, umaId);
                TempData["SuccessMessage"] = "Personaje añadido al equipo exitosamente";
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error al añadir miembro: " + ex.Message;
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> RemoveMember(int memberId)
        {
            try
            {
                await _umaTeamService.RemoveMemberFromTeamAsync(memberId);
                TempData["SuccessMessage"] = "Miembro eliminado del equipo";
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error al eliminar miembro: " + ex.Message;
            }

            return RedirectToAction(nameof(Index));
        }

        // Nueva acción para búsqueda de personajes (API)
        [HttpGet]
        public async Task<IActionResult> SearchCharacters(string term)
        {
            var characters = await _umaTeamService.SearchCharactersAsync(term);
            return Json(characters.Select(c => new
            {
                id = c.id,
                name_en = c.name_en,
                name_jp = c.name_jp,
                thumb_img = c.thumb_img
            }));
        }
    
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteTeam(int teamId)
        {
            try
            {
                var team = await _umaTeamService.GetTeamByIdAsync(teamId);
                if (team == null)
                {
                    TempData["ErrorMessage"] = "Equipo no encontrado";
                    return RedirectToAction(nameof(Index));
                }

                var teamName = team.TeamName;
                var memberCount = team.TeamMembers.Count;

                await _umaTeamService.DeleteTeamAsync(teamId);
                
                TempData["SuccessMessage"] = $"Equipo '{teamName}' eliminado exitosamente. Se removieron {memberCount} miembros.";
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error al eliminar el equipo: " + ex.Message;
            }
            
            return RedirectToAction(nameof(Index));
        }
    }
}