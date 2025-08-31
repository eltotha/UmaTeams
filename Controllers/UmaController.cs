using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Tarea2.Models;

namespace Tarea2.Controllers
{
    public class UmaController : Controller
    {

        private readonly HttpClient ClienteHttp;
        private readonly List<CharacterInfo> Umamusumes;

        public UmaController(HttpClient httpClient)
        {
            ClienteHttp = httpClient;

            Umamusumes = CallApi().GetAwaiter().GetResult();
        }

        private async Task<List<CharacterInfo>> CallApi()
        {
            var respuesta = await ClienteHttp.GetAsync("https://umapyoi.net/api/v1/character/list");
            respuesta.EnsureSuccessStatusCode();

            var json = await respuesta.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<CharacterInfo>>(json) ?? new List<CharacterInfo>();
        }

        public IActionResult Index()
        {
            return View(Umamusumes);
        }

        public IActionResult List()
        {
            return View(Umamusumes);
        }

        public IActionResult Find()
        {

            return View(Umamusumes);
        }

        public IActionResult Details()
        {
            return View();
        }
        
    }
}