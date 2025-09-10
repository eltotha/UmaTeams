using Tarea2.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tarea2.Data;
using Tarea2.Services;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Google.Protobuf.WellKnownTypes;

var builder = WebApplication.CreateBuilder(args);

// Conexión MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 39))
    )
);

// Configurar Identity - FIXED: Removed duplicate Role specification
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
.AddRoles<Role>(); // Moved AddRoles here instead of duplicate specification

// FIXED: Corrected the cookie configuration
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Cuenta/Login";
    options.AccessDeniedPath = "/Cuenta/AccessDenied";
    options.LogoutPath = "/Cuenta/Logout"; // Changed from LoginPath to LogoutPath
});

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthentication("Cookies")
    .AddCookie("Cookies", options =>
    {
        options.LoginPath = "/Cuenta/Login";
        options.ExpireTimeSpan = TimeSpan.FromSeconds(10);
        options.SlidingExpiration = true;
    });

// Agregar esto después de los otros servicios
builder.Services.AddScoped<IUmaTeamService, UmaTeamService>();

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// FIXED: Moved the seeding to after build but before running
using (var scope = app.Services.CreateScope())
{

    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
    
    // Ensure default roles exist
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


    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var httpClient = new HttpClient();
    await context.SeedFromApiAsync(httpClient);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Added static files middleware
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// FIXED: Removed duplicate MapStaticAssets() calls
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Cuenta}/{action=Login}/{id?}");

app.Run();