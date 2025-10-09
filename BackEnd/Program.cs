using Tarea2.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tarea2.Data;
using Tarea2.Services;
using System.Text.Json.Serialization; // <-- agregar

var builder = WebApplication.CreateBuilder(args);

// ======================================
// Conexión MySQL
// ======================================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 39))
    )
);

// ======================================
// Configurar Identity
// ======================================
builder.Services.AddIdentity<Usuario, Role>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.User.RequireUniqueEmail = false;
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequiredLength = 6;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders()
.AddRoles<Role>();

// ======================================
// CORS
// ======================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

// ======================================
// Servicios propios
// ======================================
builder.Services.AddScoped<IUmaTeamService, UmaTeamService>();

// ======================================
// Registrar HttpClient para el seed
// ======================================
builder.Services.AddHttpClient();

// ======================================
// Controladores con JSON ReferenceHandler
// ======================================
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.WriteIndented = true; // opcional, para mejor lectura
    });

var app = builder.Build();

// ======================================
// Seed roles y personajes
// ======================================
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    // Crear roles por defecto
    var roleManager = services.GetRequiredService<RoleManager<Role>>();
    var roles = new[] { "Admin", "User", "Moderator" };
    foreach (var roleName in roles)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new Role
            {
                Name = roleName,
                NormalizedName = roleName.ToUpper()
            });
        }
    }

    // Seed personajes desde API
    var context = services.GetRequiredService<AppDbContext>();
    var httpClient = services.GetRequiredService<HttpClient>();
    await SeedData.SeedCharactersAsync(context, httpClient);
}

// ======================================
// Pipeline
// ======================================
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowReact");

// ======================================
// Rutas
// ======================================
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Cuenta}/{action=Login}/{id?}");

app.Run();
