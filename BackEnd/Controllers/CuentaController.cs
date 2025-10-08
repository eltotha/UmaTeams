    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.Extensions.Logging;
    using System.Threading.Tasks;
    using Tarea2.Data;
    using Tarea2.Models;

    namespace Tarea2.Controllers
    {
        public class CuentaController : Controller
        {
            private readonly SignInManager<Usuario> _signInManager;
            private readonly UserManager<Usuario> _userManager;
            private readonly RoleManager<Role> _roleManager;
            private readonly ILogger<CuentaController> _logger; 

            public CuentaController(
                SignInManager<Usuario> signInManager,
                UserManager<Usuario> userManager,
                RoleManager<Role> roleManager,
                ILogger<CuentaController> logger)
            {
                _signInManager = signInManager;
                _userManager = userManager;
                _roleManager = roleManager;
                _logger = logger;
            }
            
            // POST: /Cuenta/Login
            [HttpPost]
            [AllowAnonymous]
            public async Task<ActionResult<string>> Login(LoginViewModel model)
            {

                if (ModelState.IsValid)
                {
                    var result = await _signInManager.PasswordSignInAsync(
                        model.Username, 
                        model.Password,
                        model.RememberMe,
                        lockoutOnFailure: false);

                    if (result.Succeeded)
                    {
                        _logger.LogInformation("Usuario {Username} inició sesión.", model.Username);
                        return "true";
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Usuario o contraseña incorrectos.");
                        return "Error: Usuario o contraseña incorrectos";
                    }

                    
                }else{
                    return "Modelo Incorrecto";
                }

            }


            // POST: /Cuenta/Register
            [HttpPost]
            [AllowAnonymous]
            public async Task<ActionResult<string>> Register(RegisterViewModel model)
            {

                if (ModelState.IsValid)
                {
                    var user = new Usuario
                    {
                        UserName = model.Username
                    };

                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        // Assign default role (assuming "User" role exists)
                        await _userManager.AddToRoleAsync(user, "User");
                        
                        _logger.LogInformation("Usuario {Username} se registró exitosamente.", model.Username);
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        
                        return "Usuario registrado";
                    }

                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                        return "Error al registrar";
                    }
                }

                return "Error en el modelo";
            }
            
            //POST /Cuenta/DeleteUser
            [HttpPost]
            public async Task<IActionResult> DeleteUser(string userId)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null)
                {
                    var result = await _userManager.DeleteAsync(user);
                    if (result.Succeeded)
                    {
                        return Ok("Usuario eliminado correctamente");
                    }
                    return BadRequest("Error al eliminar usuario");
                }
                return NotFound("Usuario no encontrado");
            }

            // POST: /Cuenta/Logout
        [HttpPost]
            [ValidateAntiForgeryToken]
            public async Task<IActionResult> Logout()
            {
                await _signInManager.SignOutAsync();
                _logger.LogInformation("Usuario cerró sesión.");
                return RedirectToAction("Index", "Home");
            }

            // GET: /Cuenta/AccessDenied
            [HttpGet]
            public IActionResult AccessDenied()
            {
                return View();
            }

            // GET: /Cuenta/Perfil
            [HttpGet]
            [Authorize]
            public async Task<IActionResult> Perfil()
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                    return Challenge();

                var model = new PerfilViewModel
                {
                    Username = user.UserName ?? string.Empty, 
                };

                return View(model);
            }

            private IActionResult RedirectToLocal(string returnUrl)
            {
                if (Url.IsLocalUrl(returnUrl))
                    return Redirect(returnUrl);
                else
                    return RedirectToAction("Index", "Uma");
            }
        }
    }