using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Tarea2.Data;
using Tarea2.Models;

namespace Tarea2.Data
{
    public static class SeedData
    {
        public static async Task SeedCharactersAsync(AppDbContext context, HttpClient client)
        {
            // Verificar si ya existen personajes en la DB
            if (!await context.CharacterInfo.AnyAsync())
            {
                var response = await client.GetAsync("https://umapyoi.net/api/v1/character/list");
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();

                // Deserializar la lista de personajes
                var characters = JsonConvert.DeserializeObject<List<CharacterInfo>>(json);

                if (characters != null && characters.Count > 0)
                {
                    // Guardar en la base de datos
                    await context.CharacterInfo.AddRangeAsync(characters);
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
