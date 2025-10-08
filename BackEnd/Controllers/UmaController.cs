using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Tarea2.Models;
using Tarea2.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Tarea2.Controllers
{
    [Route("Uma")]
    [ApiController]
    public class UmaController : Controller
    {

        private readonly AppDbContext _context;

        public UmaController(AppDbContext context) => _context = context;

        [HttpGet("List")]
        public async Task<IActionResult> List()
        {
            var personajes = await _context.CharacterInfo.ToListAsync();
            return Ok(personajes);
        }

    }
}