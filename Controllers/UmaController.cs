using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Tarea2.Models;
using Tarea2.Data;
using Microsoft.EntityFrameworkCore;

namespace Tarea2.Controllers
{
    public class UmaController : Controller
    {

        private readonly AppDbContext _context;

        public UmaController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var umamusumes = _context.CharacterInfo.ToList();
            return View(umamusumes);
        }

        public IActionResult List()
        {
            var umamusumes = _context.CharacterInfo.ToList();
            return View(umamusumes);
        }

        public IActionResult Find()
        {
            var umamusumes = _context.CharacterInfo.ToList();
            return View(umamusumes);
        }

        public IActionResult Details()
        {
            return View();
        }
        
    }
}