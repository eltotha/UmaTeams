using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Tarea2.Services;
using Tarea2.Models;
using Tarea2.Data;
using TuProyecto.Data;

namespace Tarea2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UmaTeamController : ControllerBase
    {
        private readonly IUmaTeamService _umaTeamService;

        public UmaTeamController(IUmaTeamService umaTeamService)
        {
            _umaTeamService = umaTeamService;
        }

        // ======================================
        // 1️⃣ Crear equipo completo (POST JSON)
        // ======================================


        [HttpPost("Create")]
        public async Task<IActionResult> CreateTeamWithMembers([FromBody] UmaTeam request)
        {


            if (string.IsNullOrWhiteSpace(request.TeamName))
                return BadRequest("El nombre del equipo no puede estar vacío.");

            var team = await _umaTeamService.CreateTeamAsync(request.TeamName);

            if (request.TeamMembers != null && request.TeamMembers.Count > 0)
            {
                foreach (var umaId in request.TeamMembers)
                {
                    await _umaTeamService.AddMemberToTeamAsync(team.Id, umaId.Id);
                }
            }

            return Ok(new
            {
                message = "Equipo creado correctamente.",
                teamId = team.Id,
                teamName = team.TeamName
            });
        }

        // ======================================
        // 2️⃣ Borrar equipo completo (DELETE JSON)
        // ======================================
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteTeam([FromBody] DeleteTeamRequest request)
        {
            if (request.Id <= 0)
                return BadRequest("Debe especificar un ID válido.");

            await _umaTeamService.DeleteTeamAsync(request.Id);
            return Ok(new { message = $"Equipo con ID {request.Id} eliminado correctamente." });
        }


        // ✅ LISTAR TODOS LOS EQUIPOS
        [HttpGet("List")]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _umaTeamService.GetAllTeamsAsync();
            return Ok(teams);
        }


        [HttpPost("AddMember")]
        public async Task<IActionResult> AddMember([FromBody] AddMemberRequest request)
        {
            Console.WriteLine("UmaID: {0}; TeamID: {1}", request.UmaId, request.TeamId);

            try
            {
                if (request.UmaId <= 0 || request.TeamId <= 0)
                    return BadRequest(new { message = "ID de equipo o personaje inválido." });

                await _umaTeamService.AddMemberToTeamAsync(request.TeamId, request.UmaId);
                return Ok(new { message = "Miembro añadido correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al añadir miembro: " + (ex.InnerException?.Message ?? ex.Message) });
            }
        }



    }
}
